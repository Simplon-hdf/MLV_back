import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
  HttpStatus,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import * as sharp from 'sharp';
import { FileInterceptor } from '@nestjs/platform-express';
import { PrismaService } from 'src/prisma/prisma.service';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ApiTags } from '@nestjs/swagger';

@Controller('images')
@ApiTags('Images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  // récupere une image, la redimensionne, la compresse puis la sauvegarde
  // dans le dossier public/images.
  @Post('upload:path')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './res/public/images', // externaliser le chemin.
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|svg)$/)) {
          return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
      limits: {
        fileSize: 4096 * 4096, // limit to 1MB
      },
    }),
  )
  async uploadImage(@UploadedFile() file) {
    // Resizing image to 300x300 using sharp module
    this.imagesService.compressImage(file, 'jpeg'); // Do something with the image (e.g. save it to the database, etc.)

    // Return the image file name and path
    return {
      filename: file.filename,
      path: file.path,
    };
  }

  @Delete(':path')
  async delete(@Param('path') filename: string) {
    const image = await this.imagesService.remove(filename);
    if (image === undefined) {
      throw new NotFoundException('Image does not exist!');
    }
  }
}
