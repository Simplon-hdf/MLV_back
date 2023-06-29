import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  roomId: string;

  @ApiProperty({
    description: 'The content of the message',
    type: String,
    required: true,
    example: 'Hello, how are you ?',
  })
  content: string;
  @ApiProperty({
    description: 'The id of the sender',
    type: Number,
    required: true,
    example: 1,
  })
  senderName: string;
  senderId: number;
  @ApiProperty({
    description: 'The id of the receiver',
    type: Number,
    required: true,
    example: 2,
  })
  receiverName: string;
  receiverId: number;
}
