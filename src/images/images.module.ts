import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { PrismaService } from '../prisma/prisma.service';
import { ArticleService } from '../article/article.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [ImagesController],
  providers: [ImagesService, PrismaService, ArticleService, JwtService],
})
export class ImagesModule {}
