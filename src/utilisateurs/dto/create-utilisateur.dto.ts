import { ApiProperty, ApiQuery } from '@nestjs/swagger';
import { RolesEnum } from '../../enum/roles.enum';

export class CreateUtilisateurDto {
  @ApiProperty({
    description: 'Email',
    example: 'test@{domain}.com',
  })
  email: string;
  @ApiProperty({
    description: 'Nom',
    example: 'Dupont',
  })
  nom: string;
  @ApiProperty({
    description: 'Prénom',
    example: 'Jean',
  })
  prenom: string;
  @ApiProperty({
    description: 'Date de naissance',
    example: new Date(),
  })
  date_naissance: Date;
  @ApiProperty({
    description: 'Mot de passe',
    example: 'password',
  })
  mot_de_passe: string;

  @ApiProperty({
    description: 'telephone',
    example: '0606060606',
  })
  telephone: string;

  @ApiProperty({
    description: 'Nationalité',
    example: 'Française',
  })
  nationalite: string;
  @ApiProperty({
    description: 'Adresse postale',
    example: '1 rue de la paix',
  })
  adresse: string;
  role: RolesEnum;
}
