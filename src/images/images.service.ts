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
          'public',
          'images',
          fileName,
        );
        await fs.writeFile(filePath, compressedImageBuffer);
        return { url: `/images/${fileName}` };
      }),
    );
    return compressedImages;
  }
  create(createImageDto: CreateImageDto) {
    return 'This action adds a new image';
  }

  compress(img: CreateImageDto) {
    return 'This action adds a new image';
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }
}
