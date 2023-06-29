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
  Res,
  Response,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { GetArticleDto } from './dto/get-article.dto';
import { Roles } from '../auth/roles/roles.decorator';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RoleGuard } from '../auth/role/role.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiExtraModels,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RolesEnum } from '../enum/roles.enum';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('article')
@ApiBearerAuth()
@ApiTags('Article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Roles(RolesEnum.conseiller, RolesEnum.moderateur, RolesEnum.administrateur)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOkResponse({
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
  @ApiConsumes('multipart/form-data')
  async create(
    @Request() req,
    @Body() createArticleDto: CreateArticleDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    //find token in header req
    const article = await this.articleService.createArticle(
      createArticleDto,
      req.cookies.jwt,
      file,
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
  @Get('articles')
  @ApiExtraModels(GetArticleDto)
  @ApiResponse({
    status: 200,
    description: 'get all article',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            StatusCode: {
              type: 'number',
              example: 200,
            },
            Message: {
              type: 'string',
              example: 'get all article',
            },
            article: {
              $ref: '#/components/schemas/GetArticleDto',
            },
          },
        },
      },
    },
  })
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
  @ApiResponse({
    status: 200,
    description: 'get one article',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            StatusCode: {
              type: 'number',
              example: 200,
            },
            Message: {
              type: 'string',
              example: 'get one article',
            },
            Article: {
              type: 'object',
              $ref: '#/components/schemas/GetArticleDto',
            },
          },
        },
      },
    },
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
    await this.articleService.update(+id, updateArticleDto);
    return;
  }

  @Roles(RolesEnum.conseiller, RolesEnum.moderateur, RolesEnum.administrateur)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':id')
  @ApiQuery({ name: 'role', enum: RolesEnum })
  async remove(@Param('id') id: string) {
    await this.articleService.remove(+id);
    return {
      message: 'Article deleted successfully',
      StatusCode: 200,
    };
  }
}
