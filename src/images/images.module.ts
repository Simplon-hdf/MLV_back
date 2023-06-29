import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { PrismaService } from '../prisma/prisma.service';
import { ArticleService } from '../article/article.service';
import { JwtService } from '@nestjs/jwt';
import { UtilisateursService } from '../utilisateurs/utilisateurs.service';

@Module({
  controllers: [ImagesController],
  providers: [
    PrismaService,
    ImagesService,
    ArticleService,
    JwtService,
    UtilisateursService,
  ],
})
export class ImagesModule {}
