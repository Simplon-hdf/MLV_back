import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/guard/local-auth.guard';
import { ApiBody } from '@nestjs/swagger';
import { LoginDto } from './auth/dto/login.dto';
import { CreateUtilisateurDto } from './utilisateurs/dto/create-utilisateur.dto';
import { MailService } from './mail/mail.service';
import { PrismaService } from './prisma/prisma.service';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';
import { Roles } from './auth/roles/roles.decorator';
import { RoleGuard } from './auth/role/role.guard';
import { RolesEnum } from './enum/roles.enum';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly mailService: MailService,
    private readonly prisma: PrismaService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @ApiBody({
    type: LoginDto,
  })
  //login with dto
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
  @Post('auth/signup')
  async signUp(@Body() user: CreateUtilisateurDto) {
    return this.authService.signUp(user);
  }

  @Roles('jeune', 'administrateur')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
