import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { PrismaService } from 'src/prisma/prisma.service';

import { JwtService } from '@nestjs/jwt';
import { UtilisateursService } from '../utilisateurs/utilisateurs.service';
import { ImagesService } from '../images/images.service';

@Module({
  controllers: [ArticleController],
  providers: [
    PrismaService,
    ArticleService,
    JwtService,
    UtilisateursService,
    ImagesService,
  ],
})
export class ArticleModule {}
