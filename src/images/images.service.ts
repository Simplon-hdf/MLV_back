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
<<<<<<< HEAD
=======

// import { post } from '@prisma/client';
>>>>>>> feature/delete/image

@Injectable()
export class ImagesService {
  private readonly imagePath = './res/public/images/';

  constructor(private prisma: PrismaService) {}

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
    return compressedImage;
  }
  async remove(filename: string): Promise<string> {
    const filePath = path.join(this.imagePath, filename);
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

<<<<<<< HEAD
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
=======
  async getForDelete(imageUrl: string): Promise<any> {
    const article = await this.prisma.post.findFirst({
      where: { url_img: imageUrl },
    });
    if (article.url_img != imageUrl) {
      article.url_img = '';
    } else {
      throw new BadRequestException('Article does not exist!');
    }
  }

  // async stockUrl(imageUrl: string, id: number): Promise<boolean> {
  //   const url = await this.getUrl(imageUrl);
  //   this.prisma.post.update({
  //     where: { id: id },
  //     data: { url_img: url },
  //   });
  //   console.log('stockUrl: ' + url + ' id: ' + id + ' debug');
  //   console.log('id:' + this.prisma.post.findUnique({ where: { id: id } }));
  //   console.log(
  //     'data:' +
  //       this.prisma.post.findFirst({ where: {}, data: { url_img: url } }),
  //   );
  //   return true;
  // }
>>>>>>> feature/delete/image

  async stockUrl(imageUrl: string, id: number): Promise<boolean> {
    const url = await this.getUrl(imageUrl);
    console.log(
      'before id:' +
        JSON.stringify(
          await this.prisma.post.findUnique({ where: { id: id } }),
        ),
    );
    console.log(
      'before data:' +
        JSON.stringify(
          await this.prisma.post.findFirst({ where: { url_img: url } }),
        ),
    );
    this.prisma.post.update({
      where: { id: id },
      data: { url_img: url },
    });
    console.log(
      'after id:' +
        JSON.stringify(
          await this.prisma.post.findUnique({ where: { id: id } }),
        ),
    );
    console.log(
      'after data:' +
        JSON.stringify(
          await this.prisma.post.findFirst({ where: { url_img: url } }),
        ),
    );
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

<<<<<<< HEAD
  async getForDelete(imageUrl) {
    return await this.deleteUrl(imageUrl);
=======
  private async getUrl(imageUrl: string) {
    return `./res/public/images/${imageUrl}`;
>>>>>>> feature/delete/image
  }
}
