import { Test, TestingModule } from '@nestjs/testing';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import fs from 'fs';

describe('ImagesController', () => {
  let imageController: ImagesController;
  let imageService: ImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImagesController],
      providers: [ImagesService],
    }).compile();
    imageController = module.get<ImagesController>(ImagesController);
    imageService = module.get<ImagesService>(ImagesService);
  });

  describe('controller', () => {
    it('should be defined', () => {
      expect(imageController).toBeDefined();
    });
  });

  describe('service', () => {
    it('should be service is defined', () => {
      expect(imageService).toBeDefined();
    });
  });
});
