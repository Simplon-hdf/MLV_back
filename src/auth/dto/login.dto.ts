import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  mot_de_passe: string;
}
