import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';
import { CreateArticleDto } from './create-article.dto';

export class UpdateArticleDto extends PartialType(CreateArticleDto) {
  @ApiProperty()
  @IsString()
  titre?: string;

  @ApiProperty()
  @IsDate()
  date_creation?: Date;

  @ApiProperty()
  @IsDate()
  date_suppression?: Date;

  @ApiProperty()
  @IsString()
  url_img?: string;

  @ApiProperty()
  @IsString()
  img_description?: string;

  @ApiProperty()
  @IsString()
  img_titre?: string;

  @ApiProperty()
  @IsString()
  sous_titre?: string;

  @ApiProperty()
  @IsString()
  contenu?: string;

  @ApiProperty()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsString()
  meta_title?: string;

  @ApiProperty()
  @IsString()
  categories?: string;

  @ApiProperty()
  @IsString()
  url_video?: string;

  @ApiProperty()
  @IsString()
  slug?: string;

  @ApiProperty()
  @IsString()
  tags?: string;

  @ApiProperty()
  @IsString()
  status?: string;
}
