import { BadRequestException, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { createWriteStream } from 'fs';
import * as sharp from 'sharp';
import * as path from 'path';
import { PrismaService } from '../prisma/prisma.service';
import { ArticleService } from '../article/article.service';

// import { post } from '@prisma/client';

@Injectable()
export class ImagesService {
  private readonly imagePath = './res/public/images/';

  constructor(
    private prisma: PrismaService,
    private readonly articleService: ArticleService,
  ) {}

  // compress images
  async compressImage(file: Express.Multer.File, format = 'jpg') {
    console.log('compress call debug');
    const baseDir = './res/public/images/';
    // stocker le nom de l'image dans la base de données
    // avec un systeme de designation de l'image
    // garder le nom original de l'image, pour l'ajouter
    // dans la section assignation.
    const filePath = path.join(baseDir, file.filename);
    const compressedImage = await sharp(file.path)
      .resize({ width: 200, height: 200 })
      .jpeg({ quality: 80 }) // compress JPEG images
      .png({ quality: 80 }) // compress PNG images
      .gif({ quality: 80 }) // compress GIF images
      .toFormat(format)
      .toBuffer();

    const writeStream = createWriteStream(filePath);
    writeStream.write(compressedImage);
    return compressedImage;
  }

  async remove(filename: string): Promise<string> {
    // rechercher le nom de l'image dans la base de données
    // avec un systeme de designation de l'image
    const filePath = path.join(this.imagePath, filename);
    const article = await this.prisma.article.update({
      where: { url_img: await this.getUrl(filename) },
      data: {
        url_img: '',
      },
    });
    console.log('article', article);
    return new Promise<string>((resolve, reject) => {
      // look for apllying async/await method
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Error deleting file: ${filePath}`, err);
          return reject(err);
        }
        resolve(filename);
      });
    });
  }

  // private method
  async getUrl(imageUrl: string) {
    return `./res/public/images/${imageUrl}`;
  }

  // verify if image or page at params exist
  async verifyImageOrPageExist(id: number, element: string): Promise<any> {
    if (element == 'article') {
      const article = this.prisma.article.findUnique({
        where: { id: id },
      });
      if (article === null) {
        throw new BadRequestException('Article does not exist!');
      }
      return article;
    } else if (element == 'page') {
      const page = await this.prisma.page.findUnique({
        where: { id: id },
      });
      if (page === null) {
        throw new BadRequestException('Page does not exist!');
      }
      return page;
    }
  }

  async stockUrl(imageUrl: string, element: string, id: number): Promise<any> {
    const url = await this.getUrl(imageUrl);
    const data = await this.verifyImageOrPageExist(id, element);
    if (element == 'article') {
      await this.articleService.updateArticle(id, { url_img: url });
    }
  }
}
