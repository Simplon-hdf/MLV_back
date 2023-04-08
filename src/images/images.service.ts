import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as fs from 'fs';
import { createWriteStream } from 'fs';
import * as sharp from 'sharp';
import * as path from 'path';
import { PrismaService } from '../prisma/prisma.service';
import { Article } from '../article/entities/article.entity';
import { ArticleService } from '../article/article.service';

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
    writeStream.end();
    return compressedImage;
  }
  async remove(filename: string): Promise<string> {
    const filePath = path.join(this.imagePath, filename);

    return new Promise<string>((resolve, reject) => {
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
      const article = await this.prisma.article.findUnique({
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
    data.url_img = url;
    return true;
  }

  async deleteUrl(imageURL: string): Promise<void> {
    const filePath = path.join(this.imagePath, imageURL);
    try {
      await fs.promises.unlink(filePath);
    } catch (error) {
      throw new NotFoundException('Image not found');
    }
  }

  async getForDelete(imageUrl) {
    return await this.deleteUrl(imageUrl);
  }
}
