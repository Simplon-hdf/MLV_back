import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';
import { PrismaService } from '../prisma/prisma.service';
import { utilisateur } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import { v4 as uuidv4 } from 'uuid';
import { pick } from 'lodash';
import { UpdatePasswordUtilisateurDto } from './dto/update-password-utilisateur.dto';
import { RolesEnum } from '../enum/roles.enum';

// Constantes
const allowedFields = [
  'nom',
  'prenom',
  'email',
  'telephone',
  'adresse',
  'nationalite',
];
const USER_NOT_FOUND_ERROR = (id: number) => `User with ID ${id} not found`;

// Interfaces
type Utilisateur = utilisateur;

// Enums
enum SaltLength {
  Default = 10,
}

@Injectable()
export class UtilisateursService {
  constructor(private readonly prisma: PrismaService) {}

  // Créer un utilisateur
  async createUtilisateur(
    createUtilisateurDto: CreateUtilisateurDto,
    role: RolesEnum,
  ): Promise<Utilisateur> {
    const salt = await bcrypt.genSalt(SaltLength.Default);
    const hashedPassword = await bcrypt.hash(
      createUtilisateurDto.mot_de_passe,
      salt,
    );
    //connect to admin table
    const user = await this.prisma.utilisateur.create({
      data: {
        ...createUtilisateurDto,
        mot_de_passe: hashedPassword,
        uuid: uuidv4(),
        role: role,
      },
    });

    switch (role) {
      case RolesEnum.administrateur:
        await this.prisma.administrateur.create({
          data: {
            utilisateur: {
              connect: {
                id: user.id,
              },
            },
          },
        });
        break;
      case RolesEnum.jeune:
        await this.prisma.jeune.create({
          data: {
            utilisateur: {
              connect: {
                id: user.id,
              },
            },
          },
        });
        break;
      case RolesEnum.conseiller:
        const a = await this.prisma.conseiller.create({
          data: {
            utilisateur: {
              connect: {
                id: user.id,
              },
            },
          },
        });
        console.log(a);
        break;
      case RolesEnum.moderateur:
        await this.prisma.moderateur.create({
          data: {
            utilisateur: {
              connect: {
                id: user.id,
              },
            },
          },
        });
        break;
    }
    console.log(user);
    return user;
  }

  // Trouver un utilisateur par ID
  async findOne(id: number): Promise<Utilisateur> {
    const user = await this.prisma.utilisateur.findUnique({ where: { id } });
    delete user.mot_de_passe;
    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND_ERROR(id));
    }
    return user;
  }

  // Trouver tous les utilisateurs
  async findAll(): Promise<Utilisateur[]> {
    return this.prisma.utilisateur.findMany();
  }

  // Mettre à jour un utilisateur
  async update(
    id: number,
    updateUtilisateurDto: UpdateUtilisateurDto,
  ): Promise<Utilisateur> {
    const user = await this.prisma.utilisateur.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND_ERROR(id));
    }

    const userData = pick(updateUtilisateurDto, allowedFields);

    return this.prisma.utilisateur.update({
      where: { id },
      data: { ...userData },
    });
  }

  // Supprimer un utilisateur
  async remove(id: number): Promise<void> {
    const user = await this.prisma.utilisateur.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.prisma.utilisateur.delete({ where: { id } });
  }
  //GET ALL USERS BUT ONLY WITH THEIR ID, NAME, FIRSTNAME AND EMAIL
  async findAllUsers() {
    return this.prisma.utilisateur.findMany({
      select: {
        id: true,
        nom: true,
        prenom: true,
        email: true,
      },
    });
  }
  //changer le mot de passe d'un utilisateur et verifier que l'ancien mot de passe est correct
  async updatePassword(
    id: number,
    updatePasswordUtilisateurDto: UpdatePasswordUtilisateurDto,
  ): Promise<Utilisateur> {
    const user = await this.prisma.utilisateur.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND_ERROR(id));
    }
    const isPasswordMatch = await bcrypt.compare(
      updatePasswordUtilisateurDto.ancien_mot_de_passe,
      user.mot_de_passe,
    );
    if (!isPasswordMatch) {
      throw new NotFoundException('Old password is incorrect');
    }
    const salt = await bcrypt.genSalt(SaltLength.Default);
    const hashedPassword = await bcrypt.hash(
      updatePasswordUtilisateurDto.nouveau_mot_de_passe,
      salt,
    );
    return this.prisma.utilisateur.update({
      where: { id },
      data: { mot_de_passe: hashedPassword },
    });
  }

  /**
   *
   * @param mail
   * @param {string} mot_de_passe
   * @returns {Promise<Prisma.Prisma__utilisateurClient<Prisma.utilisateurGetPayload<{data: {mot_de_passe: any}, where: {email: any}}>>>}
   */
  async changePassword(mail, mot_de_passe: string) {
    const salt = await bcrypt.genSalt(SaltLength.Default);
    const hashedPassword = await bcrypt.hash(mot_de_passe, salt);
    return this.prisma.utilisateur.update({
      where: { email: mail },
      data: { mot_de_passe: hashedPassword },
    });
  }

  // Trouver un utilisateur par email
  async findOneByEmail(email: string): Promise<Utilisateur> {
    return this.prisma.utilisateur.findFirst({ where: { email } });
  }
  async assignConseillerToJeune(idJeune: number, idConseiller: number) {
    const jeune = await this.prisma.jeune.findUnique({
      where: { id: idJeune },
    });
    if (!jeune) {
      throw new NotFoundException(`Jeune with ID ${idJeune} not found`);
    }

    const conseiller = await this.prisma.conseiller.findUnique({
      where: { id: idConseiller },
    });
    if (!conseiller) {
      throw new NotFoundException(
        `Conseiller with ID ${idConseiller} not found`,
      );
    }

    return this.prisma.est_attribuer.create({
      data: {
        jeune: {
          connect: { id: idJeune },
        },
        conseiller: {
          connect: { id: idConseiller },
        },
      },
    });
  }

  findAllUtilisateurs() {
    return this.prisma.utilisateur.findMany({
      include: {
        administrateur: true,
        conseiller: true,
        jeune: true,
        moderateur: true,
      },
    });
  }
}
