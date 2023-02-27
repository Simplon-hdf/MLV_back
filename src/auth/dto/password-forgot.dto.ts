import { ApiProperty } from '@nestjs/swagger';

export class passwordForgotDto {
  @ApiProperty({
    example: 'test@test.com',
    description: 'The email of the User',
  })
  email: string;
}
