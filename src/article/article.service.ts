import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { article } from '@prisma/client';
import { connect } from 'rxjs';
import { RolesEnum } from '../enum/roles.enum';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants/auth.constants';

@Injectable()
export class ArticleService {
  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async createArticle(
    createArticleDto: CreateArticleDto,
    token,
  ): Promise<article> {
    const { ...articleData } = createArticleDto;
    const article = await this.prisma.article.create({
      data: articleData,
    });
    // find role and id in token
    const role = await this.jwtService.verify(token, {
      secret: jwtConstants.secret,
    });
    console.log(role);
    const redige = await this.prisma.redige.create({
      data: {
        id_conseiller: 1,
        id_moderateur: 1,
        id_post: article.id,
      },
    });
    return article;
  }

  async updateArticle(id: number, data: any) {
    return this.prisma.article.update({
      where: { id: id },
      data: data,
    });
  }

  //update where url_img
  async updateArticleImg(url: string, img_url: string) {
    return this.prisma.article.update({
      where: { url_img: url },
      data: { url_img: img_url },
    });
  }
  updateArticleImg_url(id: number, img_url: string): Promise<article> {
    return this.prisma.article.update({
      where: { id: id },
      data: { url_img: img_url },
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
