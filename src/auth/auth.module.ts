import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/auth.constants';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AppController } from '../app.controller';
import { UtilisateursModule } from '../utilisateurs/utilisateurs.module';
import { PasswordResetController } from './password-reset/password-reset.controller';
import { PasswordResetService } from './password-reset/password-reset.service';
import { UtilisateursService } from '../utilisateurs/utilisateurs.service';
import { PrismaService } from '../prisma/prisma.service';
@Module({
  controllers: [AppController, PasswordResetController],
  imports: [
    UtilisateursModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [
    PrismaService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    PasswordResetService,
    UtilisateursService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
