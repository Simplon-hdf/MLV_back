import { Module } from '@nestjs/common';
import { UtilisateursService } from './utilisateurs.service';
import { UtilisateursController } from './utilisateurs.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [UtilisateursController],
  providers: [UtilisateursService, PrismaService],
  exports: [UtilisateursService],
})
export class UtilisateursModule {}
