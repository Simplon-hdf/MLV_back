import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class JwtCookieMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    req.headers.authorization = `Bearer ${req.headers.cookie.split('=')[1]}`;
    console.log(req.headers.cookie);
    next();
  }
}
