import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @ApiProperty({
    description: 'The content of the message',
    type: String,
    required: true,
    example: 'Hello, how are you ?',
  })
  content: string;
  @ApiProperty({
    description: 'The token of the sender',
    type: String,
    required: true,
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5hdGhhbmN1dmVsaWVyNTlAZ21haWwuY29tIiwic3ViIjo1Nywicm9sZSI6ImpldW5lIiwiaWF0IjoxNjc3NTgzMzEwLCJleHAiOjc2Nzc1ODMzMTB9.RmczbZR_8jn031IVbuepZ1x3K25RYaTD-j60ZqqHAS4',
  })
  token: string;
  @ApiProperty({
    description: 'The id of the sender',
    type: Number,
    required: true,
    example: 1,
  })
  senderId: number;
  @ApiProperty({
    description: 'The id of the receiver',
    type: Number,
    required: true,
    example: 2,
  })
  receiverId: number;
}
