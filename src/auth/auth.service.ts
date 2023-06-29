import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UtilisateursService } from '../utilisateurs/utilisateurs.service';
import * as bcrypt from 'bcrypt';
import { MailService } from '../mail/mail.service';
import { CreateUtilisateurDto } from '../utilisateurs/dto/create-utilisateur.dto';
import { RolesEnum } from '../enum/roles.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly mailService: MailService,
    private readonly usersService: UtilisateursService,
    private readonly jwtService: JwtService,
  ) {}
  async register(user: CreateUtilisateurDto, role: RolesEnum): Promise<any> {
    return await this.usersService.createUtilisateur(user, role);
  }
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && bcrypt.compareSync(pass, user.mot_de_passe)) {
      return user;
    }
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (!bcrypt.compareSync(pass, user.mot_de_passe)) {
      throw new UnauthorizedException('Wrong informations');
    }
  }

  // login with dto
  async login(user: any): Promise<any> {
    const payload = {
      email: user.email,
      id: user.id,
      role: user.role,
      prenom: user.prenom,
      nom: user.nom,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
