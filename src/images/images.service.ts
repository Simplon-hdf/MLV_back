import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { createWriteStream } from 'fs';
import * as sharp from 'sharp';
import * as path from 'path';
import * as fs from 'fs';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ImagesService {
  constructor(private prisma: PrismaService) {}
  // compress images
  async compressImage(file: Express.Multer.File, format: string = 'jpg') {
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
    return compressedImage;
  }
  private readonly imagePath = './res/public/images/';
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
      const article = await this.prisma.post.findUnique({
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
    // add url in database
    data.url_img = url;
    return true;
  }
}
