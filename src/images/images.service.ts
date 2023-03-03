import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { createWriteStream } from 'fs';
import * as sharp from 'sharp';
import * as path from 'path';
import * as fs from 'fs/promises';

@Injectable()
export class ImagesService {
  // compress images
  async compressImage(file: Express.Multer.File, format: string = 'jpg') {
    console.log('compress call debug');
    const compressedImage = await sharp(file.path)
      .resize({ width: 200, height: 200 })
      .jpeg({ quality: 80 }) // compress JPEG images
      .png({ quality: 80 }) // compress PNG images
      .gif({ quality: 80 }) // compress GIF images
      .pdf({ quality: 60 }) // compress PDF images
      //.toBuffer()
      .toFormat(format)
      .toFile('../res/public/images/' + file.filename, (err, info) => {
        if (err) {
          throw new BadRequestException(err);
        }
      }); // externaliser le chemin.
    return sharp(compressedImage);
  }

  remove(filename) {
    fs.unlink('../res/public/images/' + filename); // externaliser le chemin.
    console.log('delete call debug -> service');
  }
}
