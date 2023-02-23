import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { PrismaService } from '../prisma/prisma.service';
import { page } from '@prisma/client';

@Injectable()
export class PagesService {
  constructor(private prisma: PrismaService) {}

  async create(createPageDto: CreatePageDto): Promise<page> {
    const page = await this.prisma.page.create({
      data: createPageDto,
    });
    return page;
  }

  async findAll(): Promise<page[]> {
    const pages = await this.prisma.page.findMany();
    return pages;
  }
  async findOne(id: number): Promise<page> {
    const page = await this.prisma.page.findUnique({
      where: { id },
    });
    if (!page) {
      throw new NotFoundException(`Page with ID ${id} not found`);
    }
    return page;
  }

  async update(id: number, updatePageDto: UpdatePageDto): Promise<page> {
    const page = await this.prisma.page.findUnique({
      where: { id },
    });
    if (!page) {
      throw new NotFoundException(`Page with ID ${id} not found`);
    }
    return this.prisma.page.update({
      where: { id },
      data: updatePageDto,
    });
  }

  async remove(id: number): Promise<page> {
    const page = await this.prisma.page.findUnique({
      where: { id },
    });
    if (!page) {
      throw new NotFoundException(`Page with ID ${id} not found`);
    }
    return this.prisma.page.delete({ where: { id } });
  }
}
