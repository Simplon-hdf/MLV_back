import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UtilisateursService } from '../utilisateurs/utilisateurs.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UtilisateursService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    console.log(user);
    if (user && bcrypt.compareSync(pass, user.mot_de_passe)) {
      return user;
    }
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (!bcrypt.compareSync(pass, user.mot_de_passe)) {
      throw new UnauthorizedException();
    }
  }

  // login with dto
  async login(user: any): Promise<any> {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
