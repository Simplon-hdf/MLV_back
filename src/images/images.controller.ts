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
} from '@nestjs/common';
import { ImagesService } from './images.service';
import * as sharp from 'sharp';
import { FileInterceptor } from '@nestjs/platform-express';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(
    @UploadedFile() file: { originalname: string; buffer: any },
    // @Query('format') format: string,
  ) {
    return await this.imagesService.compressAndSaveImage(file, [
      'jpg',
      'webp',
      'png',
      'svg',
    ]);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imagesService.remove(+id);
  }
}
