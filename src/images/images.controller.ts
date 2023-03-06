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
  BadRequestException,
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
import { url } from 'inspector';
import { Exception } from 'handlebars';

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
      //originalFilename: file.originalname,
      compressedFilename: `${file.filename}`,
    };
  }
  // get url of image or page
  async getUrlForDelete(imageUrl: string) {
    // delete url with correct target

    const article = await this.prisma.post.findUnique({
      where: {
        url_img: imageUrl,
      },
    });
    const page = await this.prisma.page.findUnique({
      where: {
        url_img: imageUrl,
      },
    });

    if (article.url_img != imageUrl) {
      article.url_img = '';
    } else if (page.url_img != imageUrl) {
      page.url_img = '';
    } else {
      throw new Exception('not found url');
    }
  }
  // si c'est une image d'article

  // supprimer l'url dans la table image
  // sinon si c'est une image de page
  // supprimer l'url dans la table page
  @Delete('images/:filename')
  async delete(@Param('filename') filename: string) {
    const image = await this.imagesService.remove(filename);
    this.getUrlForDelete(filename);
    if (image === undefined) {
      throw new NotFoundException('Image does not exist!');
    }
  }
  async saveUrl(imageUrl: string, element: string, id: number) {
    const url = await this.imagesService.stockUrl(imageUrl, element, id);
  }
}
