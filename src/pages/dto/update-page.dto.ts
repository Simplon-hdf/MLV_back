import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePageDto } from './create-page.dto';

export class UpdatePageDto extends PartialType(CreatePageDto) {
  @ApiProperty()
  contenu: string;

  @ApiProperty()
  url_img: string;

  @ApiProperty()
  url_video: string;
}
