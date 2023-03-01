import { Test, TestingModule } from '@nestjs/testing';
import { ImagesService } from './images.service';

describe('ImagesService', () => {
  let service: ImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImagesService],
    }).compile();

    service = module.get<ImagesService>(ImagesService);
  });

  describe('compressAndSaveImage', () => {
    it('should compress and save the image', async () => {
      // Create a mock image file
      const buffer = Buffer.from('test image');
      const file = {
        buffer,
        originalname: 'test.jpg',
      } as Express.Multer.File;
    });
  });
});
