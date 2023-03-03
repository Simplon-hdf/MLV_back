import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { createWriteStream } from 'fs';
import * as sharp from 'sharp';
import * as path from 'path';
import * as fs from 'fs';
import { loadTsconfig } from 'tsconfig-paths/lib/tsconfig-loader';

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
      .toFile('./res/public/images/' + file.filename, (err, info) => {
        if (err) {
          throw new BadRequestException(err);
        }
      }); // externaliser le chemin.
    return sharp(compressedImage);
  }

  /*remove(filename) {
    fs.unlink('../res/public/images/' + filename); // externaliser le chemin.
    console.log('delete call debug -> service');
  }*/

  private readonly imagePath = './res/public/images/'; // Chemin d'accès au répertoire contenant les images

  /*async remove(filename: string): Promise<string> {
    const filePath = path.join(this.imagePath, filename);

    try {
      // Vérifie si le fichier existe avant de le supprimer
      await fs.promises.access(filePath, fs.constants.F_OK);
      await fs.promises.unlink(filePath);
      console.log(fs.promises);
      return filename;
    } catch (err) {
      // Si le fichier n'existe pas, renvoie undefined
      return undefined;
    }
  }*/

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
