import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { UtilisateursService } from './utilisateurs.service';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';
import { UpdatePasswordUtilisateurDto } from './dto/update-password-utilisateur.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RoleGuard } from 'src/auth/role/role.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { RolesEnum } from '../enum/roles.enum';

@Controller('utilisateurs')
@ApiTags('Utilisateurs')
export class UtilisateursController {
  constructor(private readonly utilisateursService: UtilisateursService) {}

  /**
   *
   * @param {CreateUtilisateurDto} createUtilisateurDto
   * @param {RolesEnum} role
   * @returns {{User: Promise<Utilisateur>, Message: string, StatusCode: number}}
   */
  @Roles(RolesEnum.conseiller, RolesEnum.moderateur, RolesEnum.administrateur)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  create(@Body() createUtilisateurDto: CreateUtilisateurDto, role: RolesEnum) {
    return {
      Message: 'User created Succefuly',
      User: this.utilisateursService.createUtilisateur(
        createUtilisateurDto,
        role,
      ),
      StatusCode: 201,
    };
  }

  /**
   *
   * @returns {{Users: Promise<Utilisateur[]>, statusCode: number}}
   */
  @Get('Users')
  findAll() {
    return {
      statusCode: 200,
      Message: 'Users found successfully',
      Users: this.utilisateursService.findAll(),
    };
  }

  /**
   *
   * @param {string} id
   * @returns {{User: Promise<Utilisateur>, Message: string, statusCode: number}}
   */
  @Roles(RolesEnum.moderateur, RolesEnum.administrateur)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return {
      Message: 'User found successfully',
      statusCode: 200,
      User: this.utilisateursService.findOne(+id),
    };
  }
  @SetMetadata('roles', ['conseiller'])
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUtilisateurDto: UpdateUtilisateurDto,
  ) {
    this.utilisateursService.update(+id, updateUtilisateurDto);
    return {
      StatusCode: 200,
      Message: 'Utilisateur modifié avec succès',
    };
  }
  @Roles(RolesEnum.administrateur, RolesEnum.moderateur)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    this.utilisateursService.remove(+id);
    return {
      StatusCode: 200,
      Message: 'Utilisateur supprimé avec succès',
    };
  }

  @Roles(RolesEnum.moderateur, RolesEnum.administrateur)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch(':id/change_password')
  changePassword(
    @Param('id') id: string,
    @Body() updateUtilisateurDto: UpdatePasswordUtilisateurDto,
  ) {
    this.utilisateursService.updatePassword(+id, updateUtilisateurDto);
    return {
      StatusCode: 200,
      Message: 'Mot de passe changé avec succès',
    };
  }
  //find by email
  @Roles(RolesEnum.moderateur, RolesEnum.administrateur)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('email/:email')
  findByEmail(@Param('email') email: string) {
    return {
      StatusCode: 200,
      Message: 'User found successfully',
      User: this.utilisateursService.findOneByEmail(email),
    };
  }

  @Roles(RolesEnum.moderateur, RolesEnum.administrateur)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('assignConseiller')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id_jeune: {
          type: 'number',
        },
        id_conseiller: {
          type: 'number',
        },
      },
    },
  })
  assignConseiller(
    @Body('id_jeune') id_jeune: number,
    @Body('id_conseiller') id_conseiller: number,
  ) {
    this.utilisateursService.assignConseillerToJeune(id_jeune, id_conseiller);
    return {
      StatusCode: 200,
      Message: 'Conseiller bien assignée au jeune',
    };
  }
  //pas de authguard
}
