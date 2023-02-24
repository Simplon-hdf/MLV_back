import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePageDto } from './dto/create-page.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UpdatePageDto } from './dto/update-page.dto';
import { page } from '@prisma/client';

@Injectable()
export class PagesService {
  constructor(private prisma: PrismaService) {}

  create(createPageDto: CreatePageDto) {
    return this.prisma.page.create({
      data: createPageDto,
    });
  }

  findAll() {
    return this.prisma.page.findMany();
  }

  findOne(number: number) {
    return this.prisma.page.findUnique({
      where: {
        id: number,
      },
    });
  }

  update(number: number, updatePageDto: UpdatePageDto) {
    return this.prisma.page.update({
      where: {
        id: number,
      },
      data: updatePageDto,
    });
  }

  remove(number: number) {
    return this.prisma.page.delete({
      where: {
        id: number,
      },
    });
  }
}
