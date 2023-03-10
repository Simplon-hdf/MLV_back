import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'test@{domain}.com',
    description: 'The email of the User',
  })
  email: string;

  @ApiProperty({
    example: 'password',
    description: 'The password of the User',
  })
  mot_de_passe: string;
}
