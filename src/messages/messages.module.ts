import { forwardRef, Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AppModule } from '../app.module';

@Module({
  controllers: [MessagesController],
  imports: [forwardRef(() => AppModule)],
  providers: [MessagesService, PrismaService, JwtService],
})
export class MessagesModule {}
