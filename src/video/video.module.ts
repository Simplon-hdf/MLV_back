import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { RoleGuard } from 'src/auth/role/role.guard';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { ArticleService } from 'src/article/article.service';

@Module({
  imports: [JwtModule],
  controllers: [VideoController],
  providers: [VideoService, RoleGuard, PrismaService, ArticleService],
})
export class VideoModule {}
