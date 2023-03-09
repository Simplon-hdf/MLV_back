import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { article } from '@prisma/client';

@Injectable()
export class ArticleService {
  constructor(private prisma: PrismaService) {}

  createArticle(createArticleDto: CreateArticleDto): Promise<article> {
    return this.prisma.article.create({
      data: createArticleDto,
    });
  }

  async updateArticle(id: number, data: any) {
    return this.prisma.article.update({
      where: { id: id },
      data: data,
    });
  }

  findOne(id: number): Promise<article> {
    return this.prisma.article.findUnique({
      where: { id: id },
    });
  }

  async updateArticleImg_url(id: number, img_url: string): Promise<article> {
    return this.prisma.article.update({
      where: { id: id },
      data: { url_img: img_url },
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
