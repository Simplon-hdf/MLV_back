import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { JwtService } from '@nestjs/jwt';
@Controller('messages')
export class MessagesController {
  constructor(
    private readonly messagesService: MessagesService,
    private jwtService: JwtService,
  ) {}

  @Post()
  create(@Body() data: CreateMessageDto, @Body('token') token: string) {
    const decoded = this.jwtService.decode(token);
    console.log(decoded);
    //websocket emit
    return this.messagesService.create(data);
  }
  @Get('messages/:roomId')
  findMessagesByRoomId(@Param('roomId') roomId: string) {
    return this.messagesService.findMessagesByRoomId(roomId);
  }
  @Get()
  async findAll() {
    return await this.messagesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.messagesService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMessageDto: UpdateMessageDto,
  ) {
    return await this.messagesService.update(+id, updateMessageDto);
  }

  @Get('room/:userId')
  async findRoomBySenderId(@Param('userId') userId: string) {
    return this.messagesService.findRoomBySenderId(+userId);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messagesService.remove(+id);
  }
}
