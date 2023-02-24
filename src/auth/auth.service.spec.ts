import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UtilisateursService } from '../utilisateurs/utilisateurs.service';
import { CreateUtilisateurDto } from '../utilisateurs/dto/create-utilisateur.dto';

describe('AuthService', () => {
  let service: AuthService;
  let utilisateursService: UtilisateursService;
  let prismaService: PrismaService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, PrismaService, UtilisateursService],
      imports: [
        JwtModule.register({
          secret: 'test-secret',
          signOptions: { expiresIn: '60s' },
        }),
        PassportModule,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    utilisateursService = module.get<UtilisateursService>(UtilisateursService);
    prismaService = module.get<PrismaService>(PrismaService);
    prismaService.utilisateur.deleteMany();

    // Create a user before each test
    const dto: CreateUtilisateurDto = {
      email: 'test@example.com',
      nom: 'Test',
      prenom: 'User',
      date_naissance: new Date('1990-01-01'),
      mot_de_passe: 'string',
      telephone: '1234567890',
      nationalite: 'France',
      adresse: '1 rue de la Test',
    };
    await utilisateursService.createUtilisateur(dto);
  });
  //vider la base de données

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return a user object if the email and password are correct', async () => {
      const response = await service.validateUser('test@example.com', 'string');
      expect(response).toHaveProperty('id');
      expect(response).toHaveProperty('email', 'test@example.com');
      expect(response).toHaveProperty('nom', 'Test');
      expect(response).toHaveProperty('prenom', 'User');
      expect(response).toHaveProperty('date_naissance');
      expect(response).toHaveProperty('mot_de_passe');
      expect(response).toHaveProperty('telephone', '1234567890');
      expect(response).toHaveProperty('nationalite', 'France');
      expect(response).toHaveProperty('adresse', '1 rue de la Test');
      expect(response).toHaveProperty('role', 'jeune');
    });

    it('should throw an error if the user is not found', async () => {
      await expect(
        service.validateUser('nonexistent@example.com', 'test123'),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw an error if the password is incorrect', async () => {
      await expect(
        service.validateUser('test@example.com', 'wrongpassword'),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('login', () => {
    it('should return a JWT token if the email and password are correct', async () => {
      const user = await service.validateUser('test@example.com', 'string');
      const response = await service.login(user);
      expect(response).toHaveProperty('access_token');
      expect(response.access_token).toMatch(
        /eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\.[a-zA-Z0-9_-]*\.[a-zA-Z0-9_-]*/,
      );
      console.log(response);
      //verify token
    });
  });
});
