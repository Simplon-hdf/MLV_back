import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Request,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Roles } from '../auth/roles/roles.decorator';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RoleGuard } from '../auth/role/role.guard';
import {
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RolesEnum } from '../enum/roles.enum';

@Controller('article')
@ApiBearerAuth()
@ApiTags('Article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Roles(RolesEnum.conseiller, RolesEnum.moderateur, RolesEnum.administrateur)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('create-article')
  //docuement response
  @ApiResponse({
    //body response
    status: 201,
    description: 'The article has been successfully created.',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'Article created successfully',
            },
            StatusCode: {
              type: 'number',
              example: 201,
            },
            article: {
              $ref: '#/components/schemas/CreateArticleDto',
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 403,
    description: 'cannot create article with this role',
    content: {
      'application/json': {
        schema: {
          properties: {
            message: {
              type: 'string',
              example: 'Forbidden',
            },
            StatusCode: {
              type: 'number',
              example: 403,
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized user not connected',
    content: {
      'application/json': {
        schema: {
          properties: {
            message: {
              type: 'string',
              example: 'Unauthorized',
            },
            StatusCode: {
              type: 'number',
              example: 401,
            },
          },
        },
      },
    },
  })
  async create(@Request() req, @Body() createArticleDto: CreateArticleDto) {
    //find token in header req
    const article = await this.articleService.createArticle(
      createArticleDto,
      req.cookies.jwt,
    );
    //return success message
    return {
      message: 'Article created successfully',
      StatusCode: 200,
      ...article,
    };
  }

  @Roles(RolesEnum.conseiller, RolesEnum.moderateur, RolesEnum.administrateur)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('get-all-article')
  async findAll() {
    return this.articleService.findAll();
  }

  @Roles(RolesEnum.conseiller, RolesEnum.moderateur, RolesEnum.administrateur)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    description: 'id of article',
    example: 1,
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.articleService.findOne(+id);
  }

  @Roles(RolesEnum.conseiller, RolesEnum.moderateur, RolesEnum.administrateur)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch(':id')
  @ApiQuery({ name: 'role', enum: RolesEnum })
  async update(
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    return this.articleService.updateArticle(+id, updateArticleDto);
  }

  @Roles(RolesEnum.conseiller, RolesEnum.moderateur, RolesEnum.administrateur)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':id')
  @ApiQuery({ name: 'role', enum: RolesEnum })
  async remove(@Param('id') id: string) {
    return this.articleService.remove(+id);
  }
}
