import { UtilisateursService } from '../../utilisateurs/utilisateurs.service';
import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  NotFoundException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PasswordResetService } from './password-reset.service';
import { MailService } from '../../mail/mail.service';
import { JwtService } from '@nestjs/jwt';
import { Roles } from '../roles/roles.decorator';
import { RolesEnum } from '../../enum/roles.enum';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { RoleGuard } from '../role/role.guard';
import { passwordForgotDto } from '../dto/password-forgot.dto';
import { passwordResetDto } from '../dto/password-reset.dto';

@Controller('password-reset')
@ApiTags('Password-reset')
export class PasswordResetController {
  constructor(
    private readonly passwordResetService: PasswordResetService,
    private readonly utilisateursService: UtilisateursService,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
  ) {}

  @Roles(RolesEnum.jeune)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('/forgot-password')
  async forgotPassword(@Body() dto: passwordForgotDto) {
    if (!dto.email) {
      throw new BadRequestException("L'adresse email est manquante.");
    }

    const utilisateur = await this.utilisateursService.findOneByEmail(
      dto.email,
    );
    if (!utilisateur) {
      throw new NotFoundException(
        "Cette adresse email n'est pas associée à un utilisateur.",
      );
    }

    const token = this.jwtService.sign(
      { email: dto.email },
      { expiresIn: '300s' },
    );

    try {
      await this.mailService.sendPasswordReset(dto.email, token);
      await this.passwordResetService.saveToken(dto.email, token);
    } catch (e) {
      throw new InternalServerErrorException(
        "Une erreur s'est produite lors de l'envoi de l'e-mail.",
      );
    }
  }

  @Roles(RolesEnum.jeune)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('/reset-password')
  async resetPassword(@Body() body: passwordResetDto): Promise<void> {
    if (!body.token || !body.password) {
      throw new BadRequestException(
        'Les paramètres de la requête sont manquants.',
      );
    }
    await this.passwordResetService.resetPassword(body.token, body.password);
  }
}
