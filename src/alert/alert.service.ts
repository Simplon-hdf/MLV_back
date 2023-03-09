import { Injectable } from '@nestjs/common';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, alert } from '@prisma/client';

@Injectable()
export class AlertService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<alert[]> {
    return this.prisma.alert.findMany();
  }

  async findOne(id: number) {
    return this.prisma.alert.findUnique({ where: { id } });
  }

  async remove(id: number) {
    return this.prisma.alert.delete({ where: { id } });
  }

  async create(data: alert): Promise<alert> {
    return this.prisma.alert.create({ data });
  }
}
