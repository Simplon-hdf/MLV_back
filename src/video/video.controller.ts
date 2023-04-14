import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UseGuards,
  UploadedFile,
} from '@nestjs/common';
import { VideoService } from './video.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { ApiBody, ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles/roles.decorator';
import { RolesEnum } from 'src/enum/roles.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RoleGuard } from 'src/auth/role/role.guard';

@Controller('video')
@ApiTags('Video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  // @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(RolesEnum.conseiller, RolesEnum.moderateur, RolesEnum.administrateur)
  @Post('upload')
  @ApiQuery({ name: 'role', enum: RolesEnum })
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
        destination: './res/public/videos',
        filename: (req, file, cb) => {
          const randomName = uuidv4();
          console.log('debug filename', randomName, extname(file.originalname));
          cb(null, `${randomName}${path.extname(file.originalname)}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(mp4|avi|wmv|webm|ogg)$/)) {
          return cb(new Error('Only video files are supported'), false);
        }
        cb(null, true);
      },
      limits: {
        fileSize: 500 * 1024 * 1024, // limit to 500 Mo
      },
    }),
  )
  async uploadVideo(@UploadedFile() file) {
    await this.videoService.compressVideo(file, 'mp4');
    return {
      compressedFilename: `${file.filename}`,
    };
  }
}
