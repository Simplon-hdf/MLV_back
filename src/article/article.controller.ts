import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Roles } from '../auth/roles/roles.decorator';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RoleGuard } from '../auth/role/role.guard';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { RolesEnum } from '../enum/roles.enum';

@Controller('article')
@ApiTags('Article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Roles(RolesEnum.conseiller, RolesEnum.moderateur, RolesEnum.administrateur)
  //@UseGuards(JwtAuthGuard, RoleGuard)
  @Post('create-article')
  @ApiQuery({ name: 'role', enum: RolesEnum })
  async create(
    @Body() createArticleDto: CreateArticleDto,
    @Query('role') role: RolesEnum = RolesEnum.administrateur,
  ) {
    return this.articleService.createArticle(createArticleDto);
  }

  @Get('articles')
  findAll() {
    return this.articleService.findAll();
  }

  @Roles(RolesEnum.conseiller, RolesEnum.moderateur, RolesEnum.administrateur)
  //  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get(':id')
  @ApiQuery({ name: 'role', enum: RolesEnum })
  async findOne(
    @Param('id') id: string,
    @Query('role') role: RolesEnum = RolesEnum.administrateur,
  ) {
    return this.articleService.findOne(+id);
  }

  @Roles(RolesEnum.conseiller, RolesEnum.moderateur, RolesEnum.administrateur)
  //@UseGuards(JwtAuthGuard, RoleGuard)
  @Patch(':id')
  @ApiQuery({ name: 'role', enum: RolesEnum })
  async update(
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto,
    @Query('role') role: RolesEnum = RolesEnum.administrateur,
  ) {
    return this.articleService.updateArticle(+id, updateArticleDto);
  }

  @Roles(RolesEnum.conseiller, RolesEnum.moderateur, RolesEnum.administrateur)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':id')
  @ApiQuery({ name: 'role', enum: RolesEnum })
  async remove(
    @Param('id') id: string,
    @Query('role') role: RolesEnum = RolesEnum.administrateur,
  ) {
    return this.articleService.remove(+id);
  }
}
