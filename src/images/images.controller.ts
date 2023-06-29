import {
  Controller,
  NotFoundException,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import {
  ApiConsumes,
  ApiTags,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotAcceptableResponse,
} from '@nestjs/swagger';
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
  @ApiForbiddenResponse({
    description: 'Forbidden.',
    status: 403,
    schema: {
      type: 'object',
      properties: {
        statusCode: {
          type: 'number',
          example: 403,
        },
        message: {
          type: 'string',
          example: 'Forbidden resource',
        },
      },
    },
  })
  @ApiNotAcceptableResponse({
    description: 'Not Acceptable.',
    status: 406,
    schema: {
      type: 'object',
      properties: {
        statusCode: {
          type: 'number',
          example: 406,
        },
        message: {
          type: 'string',
          example: 'Not Acceptable image format',
        },
      },
    },
  })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    schema: {
      type: 'object',
      properties: {
        originalFilename: {
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
          const ext = extname(file.originalname);
          cb(null, `${ext}`);
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
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new NotFoundException('No file found');
    }
    return this.imagesService.uploadImage(file);
  }
}
