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

  describe('create', () => {
    it('should return a string message', () => {
      const createImageDto = {};
      expect(service.create(createImageDto)).toEqual(
        'This action adds a new image',
      );
    });
  });

  describe('compress', () => {
    it('should return a string message', () => {
      const createImageDto = {};
      expect(service.compress(createImageDto)).toEqual(
        'This action adds a new image',
      );
    });
  });

  describe('remove', () => {
    it('should return a string message with the image id', () => {
      const id = 123;
      expect(service.remove(id)).toEqual(`This action removes a #${id} image`);
    });
  });
});
