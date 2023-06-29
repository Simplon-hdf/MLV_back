import {
  Injectable,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { PrismaService } from '../prisma/prisma.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Injectable()
export class ImagesService {
  private readonly s3: S3;
  private readonly bucketName = process.env.AWS_S3_BUCKET_NAME;

  constructor(private prisma: PrismaService) {
    this.s3 = new S3({
      accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    });
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    const uploadResult = await this.s3
      .upload({
        Bucket: this.bucketName,
        Key: file.originalname,
        Body: file.buffer,
      })
      .promise();

    return uploadResult.Location;
  }

  async deleteImage(url_img: string) {
    const params = {
      Bucket: this.bucketName,
      Key: url_img.split('/').pop(),
    };

    this.s3.deleteObject(params, (err, data) => {
      if (err) {
        throw new Error(err.message);
      }
    });
  }
}
