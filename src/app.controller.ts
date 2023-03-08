import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/guard/local-auth.guard';
import { ApiBody } from '@nestjs/swagger';
import { LoginDto } from './auth/dto/login.dto';
import { CreateUtilisateurDto } from './utilisateurs/dto/create-utilisateur.dto';

import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';
import { Roles } from './auth/roles/roles.decorator';
import { RoleGuard } from './auth/role/role.guard';
import { RolesEnum } from './enum/roles.enum';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @ApiBody({
    type: LoginDto,
  })
  //login with dto
  async login(@Request() req, @Res() res) {
    //save token in cookie
    const token = await this.authService.login(req.user);
    res.cookie('jwt', token.access_token, { httpOnly: true });
    return res.send(token);
  }

  @Post('auth/signup')
  async signUp(@Body() user: CreateUtilisateurDto) {
    return this.authService.signUp(user);
  }

  @Roles(RolesEnum.conseiller, RolesEnum.moderateur, RolesEnum.administrateur)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
  @Post('auth/logout')
  async logout(@Res() res) {
    res.clearCookie('jwt');
    return res.send({ message: 'Logout' });
  }
}
