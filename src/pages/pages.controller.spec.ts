import { Test, TestingModule } from '@nestjs/testing';
import { PagesController } from './pages.controller';
import { PagesService } from './pages.service';
import { CreatePageDto } from './dto/create-page.dto';

describe('PagesController', () => {
  let controller: PagesController;
  let service: PagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PagesController],
      providers: [
        {
          provide: PagesService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PagesController>(PagesController);
    service = module.get<PagesService>(PagesService);
  });

  describe('create', () => {
    const page: CreatePageDto = {
      contenu: 'test contenu',
      url_img: 'test.png',
      url_video: 'test.mp4',
      meta_title: 'test title',
      tags: 'test tags',
    };

    it('should return created page', async () => {
      const createdPage = { id: 1, ...page };
      (service.create as jest.Mock).mockReturnValue(createdPage);

      expect(await controller.create(page)).toEqual(createdPage);
      expect(service.create).toBeCalledWith(page);
    });
  });

  describe('findAll', () => {
    it('should return all pages', async () => {
      const pages = [
        {
          id: 1,
          contenu: 'test contenu',
          url_img: 'test.png',
          url_video: 'test.mp4',
          meta_title: 'test title',
          tags: 'test tags',
        },
        {
          id: 2,
          contenu: 'test2 contenu',
          url_img: 'test2.png',
          url_video: 'test2.mp4',
          meta_title: 'test2 title',
          tags: 'test2 tags',
        },
      ];
      (service.findAll as jest.Mock).mockReturnValue(pages);

      expect(await controller.findAll()).toEqual(pages);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return the first page', async () => {
      const page = {
        id: 1,
        contenu: 'test contenu',
        url_img: 'test.png',
        url_video: 'test.mp4',
        meta_title: 'test title',
        tags: 'test tags',
      };
      (service.findOne as jest.Mock).mockReturnValue(page);

      expect(await controller.findOne('1')).toEqual(page);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    const pageUpdate: CreatePageDto = {
      contenu: 'test contenu',
      url_img: 'test.png',
      url_video: 'test.mp4',
      meta_title: 'test title',
      tags: 'test tags',
    };

    it('should return updated page', async () => {
      const updatedPage = { id: 1, ...pageUpdate };
      (service.update as jest.Mock).mockReturnValue(updatedPage);

      expect(await controller.update('1', pageUpdate)).toEqual(updatedPage);
      expect(service.update).toHaveBeenCalledWith(1, pageUpdate);
    });
  });

  describe('remove', () => {
    const pageRemove: CreatePageDto = {
      contenu: 'test contenu',
      url_img: 'test.png',
      url_video: 'test.mp4',
      meta_title: 'test title',
      tags: 'test tags',
    };

    it('should return updated page', async () => {
      const removedPage = { id: 1, ...pageRemove };

      (service.remove as jest.Mock).mockReturnValue(removedPage);

      expect(await controller.remove('1')).toEqual(removedPage);
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
