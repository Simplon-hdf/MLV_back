import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { message } from '@prisma/client';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessagesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMessageDto: CreateMessageDto): Promise<message> {
    const receiver = await this.prisma.utilisateur.findUnique({
      where: { id: createMessageDto.receiverId },
    });
    const sender = await this.prisma.utilisateur.findUnique({
      where: { id: createMessageDto.senderId },
    });
    return this.prisma.message.create({
      data: {
        content: createMessageDto.content,
        receiver: {
          connect: {
            id: receiver.id,
          },
        },
        sender: {
          connect: {
            id: sender.id,
          },
        },
      },
    });
  }

  async findAll(): Promise<message[]> {
    return this.prisma.message.findMany();
  }

  async findOne(id: number): Promise<message> {
    return this.prisma.message.findUnique({ where: { id } });
  }

  async update(
    id: number,
    updateMessageDto: UpdateMessageDto,
  ): Promise<message> {
    return this.prisma.message.update({
      where: { id },
      data: {
        content: updateMessageDto.content,
      },
    });
  }

  async remove(id: number): Promise<void> {
    await this.prisma.message.delete({ where: { id } });
  }
}
