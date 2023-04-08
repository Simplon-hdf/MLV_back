import { ApiProperty } from '@nestjs/swagger';
export class CreateArticleDto {
  @ApiProperty()
  titre: string;

  @ApiProperty()
  date_creation: Date;

  @ApiProperty()
  date_suppression: Date;

  @ApiProperty()
  url_img: string;

  @ApiProperty()
  img_description: string;

  @ApiProperty()
  img_titre: string;

  @ApiProperty()
  sous_titre: string;

  @ApiProperty()
  contenu: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  meta_title: string;

  @ApiProperty()
  categories: string;

  @ApiProperty()
  url_video: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  tags: string;

  @ApiProperty()
  status: string;
}
