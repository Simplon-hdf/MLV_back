import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AuthService } from './auth/auth.service';

describe('AppController', () => {
  let controller: AppController;
  let authService: AuthService;

  beforeEach(async () => {
    const authMock = {
      login: jest.fn().mockReturnValue({ access_token: 'test_token' }),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [{ provide: AuthService, useValue: authMock }],
    }).compile();

    controller = module.get<AppController>(AppController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('login', () => {
    it('should return access token', async () => {
      const req = { user: { id: 1, email: 'test@example.com' } };
      const result = await controller.login(req);
      expect(authService.login).toHaveBeenCalledWith(req.user);
      expect(result).toEqual({ access_token: 'test_token' });
    });
  });

  describe('getProfile', () => {
    it('should return user profile', () => {
      const req = { user: { id: 1, email: 'test@example.com' } };
      const result = controller.getProfile(req);
      expect(result).toEqual(req.user);
    });
  });
});
