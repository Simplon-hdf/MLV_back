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

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
      limits: {
        fileSize: 1024 * 1024, // limit to 1MB
      },
    }),
  )
  async uploadImage(@UploadedFile() file) {
    // Resizing image to 300x300 using sharp module
    const compressedImage = await sharp(file.buffer)
      .resize(300, 300)
      .toFormat('jpeg')
      .jpeg({ quality: 75 }) // compress JPEG images
      .png({ quality: 60 }) // compress PNG images
      .gif({ quality: 60 }) // compress GIF images
      .svg({ quality: 60 }) // compress SVG images
      .toBuffer();

    // Do something with the image (e.g. save it to the database, etc.)

    // Return the image file name and path
    return {
      filename: file.filename,
      path: file.path,
    };
  }

  @Delete(':url')
  async delete(@Param('url') id: string) {
    const image = await this.imagesService.findOne(url);
    if (!image) {
      throw new NotFoundException('Image does not exist!');
    }
  }
}
