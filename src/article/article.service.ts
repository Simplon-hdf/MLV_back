import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { article } from '@prisma/client';

@Injectable()
export class ArticleService {
  constructor(private prisma: PrismaService) {}

  createArticle(createArticleDto: CreateArticleDto): Promise<article> {
    return this.prisma.article.create({
      data: createArticleDto,
    });
  }
  updateArticle(
    id: number,
    updateArticleDto: UpdateArticleDto,
  ): Promise<article> {
    return this.prisma.article.update({
      where: { id: id },
      data: updateArticleDto,
    });
  }

  findOne(id: number): Promise<article> {
    return this.prisma.article.findUnique({
      where: { id: id },
    });
  }
  findAll(): Promise<article[]> {
    return this.prisma.article.findMany();
  }
  remove(id: number): Promise<article> {
    return this.prisma.article.delete({
      where: { id: id },
    });
  }
}
