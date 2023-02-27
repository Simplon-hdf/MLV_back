import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { MailService } from '../../mail/mail.service';
import { UtilisateursService } from '../../utilisateurs/utilisateurs.service';
import { jwtConstants } from '../constants/auth.constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class PasswordResetService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailService: MailService,
    private readonly utilisateursService: UtilisateursService,
    private readonly jwtService: JwtService,
  ) {}

  async resetPassword(token: string, password: string): Promise<void> {
    const isTokenValid = this.verifyToken(token);
    if (!isTokenValid) {
      throw new Error('Invalid token');
    }
    const passwordReset = await this.prisma.password_reset.findUnique({
      where: {
        token,
      },
    });

    if (!passwordReset) {
      throw new NotFoundException('Invalid token');
    }

    await this.utilisateursService.changePassword(
      passwordReset.email,
      password,
    );

    try {
      await this.prisma.password_reset.delete({
        where: {
          id: passwordReset.id,
        },
      });
    } catch (error) {
      // handle error deleting password reset entry
      console.error(error);
    }
    // send an email to confirm the password has been reset
  }

  async saveToken(email: string, token: string) {
    console.log(email);
    return this.prisma.password_reset.create({
      data: {
        email: email,
        token: token,
        createdAt: new Date(),
      },
    });
  }
  // send an email with the token

  private verifyToken(token: string): boolean {
    const secret = jwtConstants.secret;

    try {
      this.jwtService.verify(token, { secret });
      return true;
    } catch (error) {
      return false;
    }
  }
}
