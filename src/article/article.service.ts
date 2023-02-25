import { Injectable } from '@nestjs/common';
import { post } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticleService {
  constructor(private prisma: PrismaService) {}

  createArticle(createArticleDto: CreateArticleDto) {
    createArticleDto.date_creation = new Date();
    return this.prisma.post.create({
      data: createArticleDto,
    });
  }

  findAll() {
    return this.prisma.post.findMany();
  }

  findOne(id: number) {
    return this.prisma.post.findUnique({
      select: { id: true },
      where: { id },
    });
  }

  updateArticle(id: number, updateArticleDto: UpdateArticleDto) {
    return this.prisma.post.update({
      where: { id },
      data: {
        ...updateArticleDto,
      },
    });
  }

  remove(id: number) {
    return this.prisma.post.delete({
      where: { id },
    });
  }
}
