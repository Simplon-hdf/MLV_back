import {
  Body,
  Controller,
  Get,
  Post,
  Render,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/guard/local-auth.guard';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './auth/dto/login.dto';
import { CreateUtilisateurDto } from './utilisateurs/dto/create-utilisateur.dto';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';
import { Roles } from './auth/roles/roles.decorator';
import { RoleGuard } from './auth/role/role.guard';
import { RolesEnum } from './enum/roles.enum';
import { VisitorCounterMiddleware } from './visitor/visitorCountMiddleware.middleware';
import { MessagesService } from './messages/messages.service';
import { UtilisateursService } from './utilisateurs/utilisateurs.service';

@ApiTags('auth')
@Controller()
export class AppController {
  constructor(
    private readonly visitor: VisitorCounterMiddleware,
    private readonly authService: AuthService,
    private readonly messageService: MessagesService,
    private readonly userService: UtilisateursService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @ApiOperation({ summary: 'Login with email and password' })
  @ApiBody({
    type: LoginDto,
  })
  @ApiResponse({ status: 200, description: 'Logged in successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(@Request() req, @Res() res) {
    //save token in cookie
    const token = await this.authService.login(req.user);
    res.cookie('jwt', token.access_token, { httpOnly: true });
    return res.send(token);
  }

  @Roles(RolesEnum.administrateur)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('auth/signup/conseiller')
  @ApiOperation({ summary: 'Sign up a new conseiller' })
  async signUpConseiller(@Body() user: CreateUtilisateurDto) {
    await this.authService.register(user, RolesEnum.conseiller);
    return {
      statusCode: 201,
      message: 'User registered successfully',
    };
  }

  @Roles(RolesEnum.administrateur)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('auth/signup/moderateur')
  @ApiOperation({ summary: 'Sign up a new moderateur' })
  async signUpModerateur(@Body() user: CreateUtilisateurDto) {
    await this.authService.register(user, RolesEnum.moderateur);
    return {
      statusCode: 201,
      message: 'User registered successfully',
    };
  }

  @Post('auth/signup/jeune')
  @ApiOperation({ summary: 'Sign up a new jeune' })
  async signUpJeune(@Body() user: CreateUtilisateurDto) {
    await this.authService.register(user, RolesEnum.jeune);
    return {
      statusCode: 201,
      message: 'User registered successfully',
    };
  }

  //@Roles(RolesEnum.administrateur)
  //@UseGuards(JwtAuthGuard, RoleGuard)
  @Post('auth/signup/administrateur')
  @ApiOperation({ summary: 'Sign up a new administrateur' })
  async signUpAdministrateur(@Body() user: CreateUtilisateurDto) {
    await this.authService.register(user, RolesEnum.administrateur);

    return {
      statusCode: 201,
      message: 'User registered successfully',
    };
  }

  @Roles(
    RolesEnum.conseiller,
    RolesEnum.moderateur,
    RolesEnum.administrateur,
    RolesEnum.jeune,
  )
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('profile')
  @ApiOperation({ summary: 'Get the current user profile' })
  async getProfile(@Request() req) {
    return await this.userService.findOne(req.user.id);
  }

  @Post('auth/logout')
  @ApiOperation({ summary: 'Log out the current user' })
  async logout(@Res() res) {
    res.clearCookie('jwt');
    return res.send({ message: 'Logout' });
  }

  @Get()
  index(@Request() req) {
    return this.visitor.use;
  }
}
