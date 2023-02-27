import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { Express } from 'express';
import { createWriteStream } from 'fs';

@Injectable()
export class ImagesService {
  async storeFile(file: Express.Multer.File): Promise<void> {
    const filename = file.filename;
    const stream = createWriteStream(`./uploads/${filename}`);
    stream.write(file.buffer);
    stream.end();
  }

  compress(img: CreateImageDto) {
    return 'This action adds a new image';
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }
}
