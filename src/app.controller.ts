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

  @Get('profile')
  getProfile(@Request() req) {
    console.log(req.user);
    return req.user;
  }
}
