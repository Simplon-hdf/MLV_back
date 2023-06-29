import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { CreateUtilisateurDto } from '../utilisateurs/dto/create-utilisateur.dto';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: CreateUtilisateurDto, token: string) {
    const url = `http://localhost:3000/confirmation/${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Nice App! Confirm your Email',
      template: 'confirmation', // `.hbs` extension is appended automatically
      context: {
        name: user.nom,
        url,
      },
    });
  }

  async sendPasswordReset(email: string, token: any) {
    const url = `http://localhost:3000/reset-password/${token}`;

    await this.mailerService.sendMail({
      to: 'nathancuvelier59@icloud.com',
      // from: '"Support Team" <
      subject: 'Reset your password',
      template: 'reset-password', // `.hbs` extension is appended automatically
      context: {
        name: 'Nathan',
        // ✏️ filling curly brackets with content
        url,
      },
    });
  }
}
