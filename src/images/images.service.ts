import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { createWriteStream } from 'fs';
import * as sharp from 'sharp';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class ImagesService {
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
}
