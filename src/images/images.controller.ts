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
} from '@nestjs/common';
import { ImagesService } from './images.service';
import * as sharp from 'sharp';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    return await this.imagesService.compressAndSaveImage(file);
  }

  // @Post('compress') // compress file with (resize, extension, quality) of image
  // async compressImage(inputBuffer: Buffer): Promise<Buffer> {
  //   const outputBuffer = await sharp(inputBuffer)
  //     .resize(800, 600)
  //     .jpeg({ quality: 80 })
  //     .toBuffer();
  //
  //   return await outputBuffer;
  // }
  // @Post('upload') // upload file with specifications
  // @UseInterceptors(
  //   UploadedFile(
  //     new ParseFilePipeBuilder()
  //       .addFileTypeValidator({
  //         fileType: 'jpeg',
  //       })
  //       .addMaxSizeValidator({
  //         maxSize: 1000,
  //       })
  //       .build({
  //         errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  //       }),
  //   ),
  // )
  // async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<void> {
  //   const fileData = file.buffer;
  //   await this.imagesService.storeFile(fileData);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imagesService.remove(+id);
  }
}
