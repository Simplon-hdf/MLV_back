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
import { ApiConsumes, ApiTags, ApiBody } from '@nestjs/swagger';
import * as fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

@Controller('images')
@ApiTags('Images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}
  // récupere une image, la redimensionne, la compresse puis la sauvegarde
  // dans le dossier public/images.
  @Post('upload')
  @ApiBody({
    required: true,
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './res/public/images', // externaliser le chemin.
        filename: (req, file, cb) => {
          const randomName = uuidv4(); //Array(32)
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|svg|pdf)$/)) {
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
    this.imagesService.compressImage(file, 'jpg'); // Do something with the image (e.g. save it to the database, etc.)

    // Return the image file name and path
    return {
      originalFilename: file.originalname,
      compressedFilename: `${file.filename}`,
    };
  }

  @Delete('images/:filename')
  async delete(@Param('filename') filename: string) {
    console.log('delete call debug -> controller');
    const image = await this.imagesService.remove(filename);
    if (image === undefined) {
      throw new NotFoundException('Image does not exist!');
    }
  }
}
