import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { PagesService } from './pages.service';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { Roles } from '../auth/roles/roles.decorator';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RoleGuard } from '../auth/role/role.guard';
import { ApiTags } from '@nestjs/swagger';
import { ApiQuery } from '@nestjs/swagger';
import { RolesEnum } from '../enum/roles.enum';

@Controller('pages')
@ApiTags('Pages')
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  @Roles('moderateur', 'administrateur')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  @ApiQuery({ name: 'role', enum: RolesEnum })
  async create(
    @Body() createPageDto: CreatePageDto,
    @Query('role') role: RolesEnum = RolesEnum.administrateur,
  ) {
    return this.pagesService.create(createPageDto);
  }

  @Get()
  findAll() {
    return this.pagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pagesService.findOne(+id);
  }

  @Roles('moderateur', 'administrateur')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch(':id')
  @ApiQuery({ name: 'role', enum: RolesEnum })
  async update(
    @Param('id') id: string,
    @Body() updatePageDto: UpdatePageDto,
    @Query('role') role: RolesEnum = RolesEnum.administrateur,
  ) {
    return this.pagesService.update(+id, updatePageDto);
  }

  @Roles('moderateur', 'administrateur')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':id')
  @ApiQuery({ name: 'role', enum: RolesEnum })
  async remove(
    @Param('id') id: string,
    @Query('role') role: RolesEnum = RolesEnum.administrateur,
  ) {
    return this.pagesService.remove(+id);
  }
}
