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
import { ApiConsumes, ApiTags, ApiBody } from '@nestjs/swagger';
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
    await this.imagesService.compressImage(file, 'jpg'); // Do something with the image (e.g. save it to the database, etc.)

    // Return the image file name and path
    return {
      //originalFilename: file.originalname,
      compressedFilename: `${file.filename}`,
    };
  }

  // get url of image or page
  async getUrlForDelete(imageUrl) {
    // delete url with correct target
    await this.imagesService.getForDelete(imageUrl);
  }

  @Post('delete/:filename')
  async delete(@Param('filename') filename: string) {
    const image = await this.imagesService.remove(filename);

    if (image === undefined) {
      throw new NotFoundException('Image does not exist!');
    }
  }

  async saveUrl(imageUrl: string, element: string, id: number) {
    const url = await this.imagesService.stockUrl(imageUrl, element, id);
  }
}
