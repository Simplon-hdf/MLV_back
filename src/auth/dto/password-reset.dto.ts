import { ApiProperty } from '@nestjs/swagger';

export class passwordResetDto {
  @ApiProperty({
    example: '',
  })
  token: string;
  @ApiProperty({ example: ' ' })
  password: string;
}
