import { Injectable } from '@nestjs/common';
import * as ffmpeg from 'fluent-ffmpeg';
import * as fs from 'fs';
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
          fs.unlinkSync(file.path);
          resolve();
        })
        .save(this.videoPath);
    });
  }
}
