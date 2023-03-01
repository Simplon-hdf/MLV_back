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
import { UtilisateursService } from './utilisateurs.service';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';
import { UpdatePasswordUtilisateurDto } from './dto/update-password-utilisateur.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RoleGuard } from 'src/auth/role/role.guard';
import { Roles } from '../auth/roles/roles.decorator';

@Controller('utilisateurs')
export class UtilisateursController {
  constructor(private readonly utilisateursService: UtilisateursService) {}

  @Roles('conseiller', 'moderateur', 'administrateur')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  create(@Body() createUtilisateurDto: CreateUtilisateurDto) {
    return this.utilisateursService.createUtilisateur(createUtilisateurDto);
  }

  @Roles('moderateur', 'administrateur')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get()
  findAll() {
    return this.utilisateursService.findAll();
  }
  @Roles('moderateur', 'administrateur')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.utilisateursService.findOne(+id);
  }
  @Roles('moderateur', 'administrateur')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUtilisateurDto: UpdateUtilisateurDto,
  ) {
    return this.utilisateursService.update(+id, updateUtilisateurDto);
  }
  @Roles('administrateur')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.utilisateursService.remove(+id);
  }

  @Roles('jeune', 'moderateur', 'administrateur')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch(':id/change_password')
  changePassword(
    @Param('id') id: string,
    @Body() updateUtilisateurDto: UpdatePasswordUtilisateurDto,
  ) {
    return this.utilisateursService.updatePassword(+id, updateUtilisateurDto);
  }
  //find by email
  @Roles('moderateur', 'administrateur')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('email/:email')
  findByEmail(@Param('email') email: string) {
    return this.utilisateursService.findOneByEmail(email);
  }
}
