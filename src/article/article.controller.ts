import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Roles } from '../auth/roles/roles.decorator';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RoleGuard } from '../auth/role/role.guard';

@Controller('article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Roles('conseiller', 'moderateur', 'administrateur')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('create-article')
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.createArticle(createArticleDto);
  }

  @Get('articles')
  findAll() {
    return this.articleService.findAll();
  }

  @Roles('conseiller', 'moderateur', 'administrateur')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articleService.findOne(+id);
  }

  @Roles('conseiller', 'moderateur', 'administrateur')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articleService.updateArticle(+id, updateArticleDto);
  }

  @Roles('conseiller', 'moderateur', 'administrateur')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleService.remove(+id);
  }
}
