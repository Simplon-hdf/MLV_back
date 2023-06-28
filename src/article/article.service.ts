import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { article, Prisma } from '@prisma/client';
import { RolesEnum } from '../enum/roles.enum';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants/auth.constants';
import { UtilisateursService } from '../utilisateurs/utilisateurs.service';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ImagesService } from '../images/images.service';

@Injectable()
export class ArticleService {
  constructor(
    private prisma: PrismaService,
    private utilisateur: UtilisateursService,
    private readonly jwtService: JwtService,
    private readonly imagesService: ImagesService,
  ) {}

  /**
   * Create an article
   * @param {CreateArticleDto} createArticleDto
   * @param token
   * @param file
   * @returns {Promise<article>}
   */
  async createArticle(
    createArticleDto: CreateArticleDto,
    token,
    file: Express.Multer.File,
  ): Promise<article> {
    const { ...articleData } = createArticleDto;
    let article;
    try {
      article = await this.prisma.article.create({
        data: {
          ...articleData,
          url_img: file ? await this.imagesService.uploadImage(file) : null,
        },
      });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        throw new HttpException(
          'An article with this url_img already exists',
          HttpStatus.CONFLICT,
        );
      } else {
        throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    const id = article.id;
    const user = this.jwtService.verify(token, {
      secret: jwtConstants.secret,
    });
    const id_user: number = user.id;
    const conseiller = await this.utilisateur.findOne(id_user);
    if (
      user.role == RolesEnum.moderateur ||
      user.role == RolesEnum.administrateur
    ) {
      try {
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
      } catch (e) {
        throw new HttpException(
          'Failed to create the relation between the article and the user',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
    return article;
  }

  /**
   * Find all articles
   * @param {number} id
   * @param {UpdateArticleDto} data
   * @returns {Promise<article>}
   */
  async update(id: number, data: UpdateArticleDto): Promise<article> {
    try {
      return await this.prisma.article.update({
        where: { id: id },
        data: { ...data },
      });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2025'
      ) {
        throw new HttpException(
          'No article found with this ID',
          HttpStatus.NOT_FOUND,
        );
      } else {
        throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async findOne(id: number): Promise<article> {
    try {
      return await this.prisma.article.findUnique({
        where: { id: id },
      });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2025'
      ) {
        throw new HttpException(
          'No article found with this ID',
          HttpStatus.NOT_FOUND,
        );
      } else {
        throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async findAll(): Promise<article[]> {
    try {
      return await this.prisma.article.findMany();
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number): Promise<article> {
    try {
      return await this.prisma.article.delete({
        where: { id: id },
      });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2025'
      ) {
        throw new HttpException(
          'No article found with this ID',
          HttpStatus.NOT_FOUND,
        );
      } else {
        throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
