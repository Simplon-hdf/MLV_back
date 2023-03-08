import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { PrismaService } from '../prisma/prisma.service';
import { ArticleService } from '../article/article.service';

@Module({
  controllers: [ImagesController],
  providers: [ImagesService, PrismaService, ArticleService],
})
export class ImagesModule {}
