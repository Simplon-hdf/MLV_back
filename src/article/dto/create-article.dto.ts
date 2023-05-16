import { ApiProperty } from '@nestjs/swagger';
export class CreateArticleDto {
  @ApiProperty({
    type: String,
    description: "titre de l'article",
    required: true,
    example: 'titre',
  })
  titre: string;

  @ApiProperty({
    type: Date,
    description: "date de creation de l'article",
    required: true,
    example: '2021-01-01T00:00:00.000Z',
  })
  date_creation: Date;

  @ApiProperty({
    type: Date,
    description: "date de modification de l'article",
    required: true,
    example: '2021-01-01T00:00:00.000Z',
  })
  date_suppression: Date;

  @ApiProperty({
    type: String,
    description: "url de l'image de l'article",
    required: true,
    example:
      'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
  })
  url_img: string;

  @ApiProperty({
    type: String,
    description: "description de l'image de l'article",
    required: true,
    example: 'description',
  })
  img_description: string;

  @ApiProperty({
    type: String,
    description: "titre de l'image de l'article",
    required: true,
    example: 'titre',
  })
  img_titre: string;

  @ApiProperty({
    type: String,
    description: "sous titre de l'article",
    required: true,
    example: 'sous titre',
  })
  sous_titre: string;

  @ApiProperty({
    type: String,
    description: "contenu de l'article",
    required: true,
    example: 'contenu',
  })
  contenu: string;

  @ApiProperty({
    type: String,
    description: "description de l'article",
    required: true,
    example: 'description',
  })
  description: string;

  @ApiProperty({
    type: String,
    description: " meta titre de l'article",
    required: true,
    example: 'meta titre',
  })
  meta_title: string;

  @ApiProperty({
    type: String,
    description: "categorie de l'article",
    required: true,
    example: 'categorie',
  })
  categories: string;

  @ApiProperty({
    type: String,
    description: "url de la video de l'article",
    required: true,
    example: 'https://www.youtube.com/watch?v=1y_kfWUCFDQ',
  })
  url_video: string;

  @ApiProperty({
    type: String,
    description: "slug de l'article",
    required: true,
    example: 'slug',
  })
  slug: string;

  @ApiProperty({
    type: String,
    description: "tags de l'article",
    required: true,
    example: 'tags',
  })
  tags: string;

  @ApiProperty({
    type: String,
    description: "status de l'article",
    required: true,
    example: 'status',
  })
  status: string;
}
