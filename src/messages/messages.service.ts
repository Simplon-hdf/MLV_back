import { Get, Injectable, Render } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { message } from '@prisma/client';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessagesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMessageDto: CreateMessageDto): Promise<message> {
    return this.prisma.message.create({ data: createMessageDto });
  }
  async findAll(): Promise<message[]> {
    return this.prisma.message.findMany();
  }
  async findMessagesByRoomId(roomId: string): Promise<message[]> {
    return this.prisma.message.findMany({ where: { roomId } });
  }
  async findOne(id: number): Promise<message> {
    return this.prisma.message.findUnique({ where: { id } });
  }

  //find room where id is sender or recerver id
  async findRoomBySenderId(senderId: number) {
    return this.prisma.message.findMany({
      select: {
        roomId: true,
      },
      where: {
        OR: [
          {
            AND: [
              {
                senderId,
              },
              {
                receiverId: {
                  not: senderId,
                },
              },
            ],
          },
          {
            AND: [
              {
                senderId: {
                  not: senderId,
                },
              },
              {
                receiverId: senderId,
              },
            ],
          },
        ],
      },
      distinct: ['roomId'], // Ajout de la propriété distinct
    });
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
