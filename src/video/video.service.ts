import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as ffmpeg from 'fluent-ffmpeg';
import * as fs from 'fs';
import * as path from 'path';
import { ArticleService } from 'src/article/article.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VideoService {
  private readonly videoPath = './res/public/videos/';

  constructor(
    private prisma: PrismaService,
    private readonly articleService: ArticleService,
  ) {}

  // compress Videos and sending on server
  async compressVideo(
    file: Express.Multer.File,
    format = 'mp4',
  ): Promise<void> {
    const outputFilePath = path.join(
      this.videoPath,
      `compressed_${file.filename}`,
    );
    return new Promise<void>((resolve, reject) => {
      ffmpeg(file.path)
        .videoCodec('libx264')
        .audioCodec('libmp3lame')
        .size('360x480')
        .format(format)
        .keepDAR()
        .on('error', function (err) {
          console.log(`Error, cannot process video`);
          reject(err);
        })
        .on('end', function () {
          console.log(`Transcoding of succeeded!`);
          setTimeout(() => {
            fs.unlinkSync(file.path);
          }, 500);
          resolve();
        })
        .save(outputFilePath);
    });
  }

  // remove video on server
  async remove(filename: string): Promise<string> {
    const filePath = `./res/public/videos/${filename}`;
    // if (!fs.existsSync(filePath)) {
    //   console.error(`Error deleting file: ${filePath}. File not found.`);
    //   throw new InternalServerErrorException();
    // }

    // Delete video
    return new Promise<string>((resolve, reject) => {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Error deleting file: ${filePath}`, err);
          reject(err);
        } else {
          console.log(`File ${filePath} deleted successfully.`);
          resolve(filename);
        }
      });
    });
  }
}
