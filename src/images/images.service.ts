import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { createWriteStream } from 'fs';
import * as sharp from 'sharp';
import * as path from 'path';
import * as fs from 'fs/promises';

@Injectable()
export class ImagesService {
  async compressAndSaveImage(
    file: Express.Multer.File,
    formats: string[] = ['jpg', 'webp', 'png', 'svg'],
  ) {
    // taille de l'image
    const MAX_SIZE = 1024 * 1024; // 1 MB
    if (file.size > MAX_SIZE) {
      throw new BadRequestException(
        `Image too large. Max size ${MAX_SIZE / 1024} KB`,
      );
    }
    // image compressé
    const compressedImages = await Promise.all(
      formats.map(async (format) => {
        const compressedImageBuffer = await sharp(file.buffer)
          .resize({ with: 500 })
          .toFormat(format)
          .toBuffer();
        const fileName = `${Date.now()}-${file.originalname}.${format}`;
        const filePath = path.join(
          __dirname,
          '..',
          'res',
          'public',
          'images',
          fileName,
        );
        await fs.writeFile(filePath, compressedImageBuffer);
        return { url: `/res/public/images/${fileName}` };
      }),
    );
    return compressedImages;
  }

  // compress images
  async compressImage(file: Express.Multer.File, format: string = 'jpeg') {
    const compressedImage = await sharp(file.buffer)
      .resize(300, 300)
      .toFormat(format)
      .jpeg({ quality: 75 }) // compress JPEG images
      .png({ quality: 60 }) // compress PNG images
      .gif({ quality: 60 }) // compress GIF images
      .svg({ quality: 60 }) // compress SVG images
      .toBuffer();
    return compressedImage;
  }

  remove(filename) {
    fs.unlink('../res/public/images/' + filename); // externaliser le chemin.
  }
}
