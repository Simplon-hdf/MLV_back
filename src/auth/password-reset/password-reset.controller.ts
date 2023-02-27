import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { MailService } from '../../mail/mail.service';
import { UtilisateursService } from '../../utilisateurs/utilisateurs.service';
import { JwtService } from '@nestjs/jwt';
import { PasswordResetService } from './password-reset.service';
import { passwordForgotDto } from '../dto/password-forgot.dto';
import { passwordResetDto } from '../dto/password-reset.dto';
@Controller('password-reset')
export class PasswordResetController {
  constructor(
    private readonly passwordResetService: PasswordResetService,
    private readonly utilisateursService: UtilisateursService,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('/forgot-password')
  async forgotPassword(@Body() dto: passwordForgotDto) {
    console.log(dto.email);
    if (!dto.email) {
      throw new HttpException(
        "L'adresse email est manquante.",
        HttpStatus.BAD_REQUEST,
      );
    }

    // Vérifiez que l'e-mail est associé à un utilisateur
    const utilisateur = await this.utilisateursService.findOneByEmail(
      dto.email,
    );
    if (!utilisateur) {
      throw new HttpException(
        "Cette adresse email n'est pas associée à un utilisateur.",
        HttpStatus.NOT_FOUND,
      );
    }

    // Générez un jeton JWT unique
    const token = this.jwtService.sign(
      { email: dto.email },
      { expiresIn: '30s' },
    );

    await this.mailService.sendPasswordReset(dto.email, token);

    // Enregistrez le jeton dans la base de données
    return await this.passwordResetService.saveToken(dto.email, token);

    // Envoyez un e-mail avec le jeton
  }

  @Post('/reset-password')
  async resetPassword(@Body() body: passwordResetDto): Promise<void> {
    if (!body.token || !body.password) {
      throw new HttpException(
        'Les paramètres de la requête sont manquants.',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Réinitialisez le mot de passe avec le jeton fourni
    await this.passwordResetService.resetPassword(body.token, body.password);
  }
}
