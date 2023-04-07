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

@Controller('video')
@ApiTags('Video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post()
  @ApiQuery({ name: 'role', enum: RolesEnum })
  @Roles(RolesEnum.conseiller, RolesEnum.moderateur, RolesEnum.administrateur)
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
          cb(null, `${randomName}$extname(file.originalname)`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(mp4|avi|wmv|webm|ogg)$/)) {
          return cb(new Error('Only video files are supported'), false);
        }
        cb(null, true);
      },
      limits: {
        fileSize: 5 * 1024 * 1024, // limit to 5 Mo
      },
    }),
  )
  async create(
    @Body() createVideoDto: CreateVideoDto,
    @Query('role') role: RolesEnum = RolesEnum.administrateur,
  ) {
    return this.videoService.create(createVideoDto);
  }

  @Get()
  findAll() {
    return this.videoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto) {
    return this.videoService.update(+id, updateVideoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videoService.remove(+id);
  }
}
