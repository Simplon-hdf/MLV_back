import { Test, TestingModule } from '@nestjs/testing';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import * as fs from 'fs';
import * as path from 'path';

describe('ImagesController', () => {
  let app: INestApplication;
  let controller: ImagesController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImagesController],
      providers: [ImagesService],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    controller = module.get<ImagesController>(ImagesController);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('uploadImage', () => {
    it('should return the URL of the uploaded image', async () => {
      const response = await request(app.getHttpServer())
        .post('/images/upload')
        .attach('image', path.join(__dirname, 'test.jpg'));

      expect(response.status).toBe(HttpStatus.CREATED);
      expect(response.body.url).toBeDefined();

      // Optional: delete the uploaded image file
      const filePath = path.join(
        __dirname,
        '..',
        'public',
        'images',
        response.body.url.split('/').pop(),
      );
      await fs.promises.unlink(filePath);
    });
  });
});
