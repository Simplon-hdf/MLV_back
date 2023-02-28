import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { createWriteStream } from 'fs';
import * as sharp from 'sharp';
import * as path from 'path';
import * as fs from 'fs/promises';

@Injectable()
export class ImagesService {
  async compressAndSaveImage(file: Express.Multer.File) {
    const compressedImageBuffer = await sharp(file.buffer)
      .resize({ width: 500 })
      .toBuffer();

    const fileName = `${Date.now()}-${file.originalname}`;
    const filePath = path.join(__dirname, '..', 'public', 'images', fileName);

    await fs.writeFile(filePath, compressedImageBuffer);

    return { url: `/images/${fileName}` };
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
