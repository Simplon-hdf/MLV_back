import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { RoleGuard } from 'src/auth/role/role.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule],
  controllers: [VideoController],
  providers: [VideoService, RoleGuard],
})
export class VideoModule {}
