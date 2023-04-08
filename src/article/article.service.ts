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
    const id = article.id;
    // find role and id in token
    const user = this.jwtService.verify(token, {
      secret: jwtConstants.secret,
    });
    //
    const id_user: number = user.sub;
    console.log(user);
    const conseiller = await this.prisma.conseiller.findUnique({
      where: { id: id_user },
    });
    //create relation between article and user
    if (
      user.role == RolesEnum.moderateur ||
      user.role == RolesEnum.administrateur
    ) {
      await this.prisma.redige.create({
        data: {
          article: {
            connect: {
              id: id,
            },
          },
          conseiller: {
            connect: conseiller ? { id: conseiller.id } : undefined,
            create: conseiller ? undefined : { id: id_user },
          },
        },
      });
    }

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
