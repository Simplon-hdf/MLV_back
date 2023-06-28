import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from '../constants/auth.constants';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  /**
   *
   * @param payload
   * @returns {Promise<{role: any, id: any, prenom: any, nom: any, email: any}>}
   */
  async validate(payload: any) {
    return {
      email: payload.email,
      id: payload.id,
      role: payload.role,
      prenom: payload.prenom,
      nom: payload.nom,
    };
  }
}
