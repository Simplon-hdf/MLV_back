import { Test, TestingModule } from '@nestjs/testing';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';

describe('ArticleController', () => {
  let controller: ArticleController;
  let service: ArticleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticleController],
      providers: [
        {
          provide: ArticleService,
          useValue: {
            createArticle: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            updateArticle: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ArticleController>(ArticleController);
    service = module.get<ArticleService>(ArticleService);
  });

  //test create article
  describe('create an article', () => {
    const article: CreateArticleDto = {
      titre: 'Test article',
      date_creation: new Date('2005-06-07'),
      date_suppression: new Date('2006-05-04'),
      url_img: 'https://example.com/image.jpg',
      img_description: 'An example image',
      img_titre: 'Example image',
      sous_titre: 'Test subtitle',
      contenu: 'Test content',
      description: 'Test description',
      meta_title: 'Test meta title',
      categories: 'Test category',
      url_video: 'https://example.com/video.mp4',
      slug: 'test-article',
      tags: 'Test tag',
      status: 'published',
    };

    it('should return the created article', async () => {
      const createdArticle = { id: 1, ...article };
      (service.createArticle as jest.Mock).mockResolvedValue(createdArticle);

      expect(await controller.create(article)).toEqual(createdArticle);
      expect(service.createArticle).toBeCalledWith(article);
    });
  });

  // test find all articles
  describe('findAll', () => {
    it('should return an array articles', async () => {
      const articles = [
        {
          id: 1,
          titre: 'Test article',
          date_creation: new Date('2005-06-07'),
          date_suppression: new Date('2006-05-04'),
          url_img: 'https://example.com/image.jpg',
          img_description: 'An example image',
          img_titre: 'Example image',
          sous_titre: 'Test subtitle',
          contenu: 'Test content',
          description: 'Test description',
          meta_title: 'Test meta title',
          categories: 'Test category',
          url_video: 'https://example.com/video.mp4',
          slug: 'test-article',
          tags: 'Test tag',
          status: 'published',
        },
        {
          id: 2,
          titre: 'Test article',
          date_creation: new Date('2005-06-07'),
          date_suppression: new Date('2006-05-04'),
          url_img: 'https://example.com/image.jpg',
          img_description: 'An example image',
          img_titre: 'Example image',
          sous_titre: 'Test subtitle',
          contenu: 'Test content',
          description: 'Test description',
          meta_title: 'Test meta title',
          categories: 'Test category',
          url_video: 'https://example.com/video.mp4',
          slug: 'test-article',
          tags: 'Test tag',
          status: 'published',
        },
      ];
      (service.findAll as jest.Mock).mockResolvedValue(articles);
      expect(await controller.findAll()).toEqual(articles);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  // test find one article by id
  describe('findOne', () => {
    it('should return the article with our id', async () => {
      const article = {
        id: 1,
        titre: 'Test article',
        date_creation: new Date('2005-06-07'),
        date_suppression: new Date('2006-05-04'),
        url_img: 'https://example.com/image.jpg',
        img_description: 'An example image',
        img_titre: 'Example image',
        sous_titre: 'Test subtitle',
        contenu: 'Test content',
        description: 'Test description',
        meta_title: 'Test meta title',
        categories: 'Test category',
        url_video: 'https://example.com/video.mp4',
        slug: 'test-article',
        tags: 'Test tag',
        status: 'published',
      };
      (service.findOne as jest.Mock).mockResolvedValue(article);

      expect(await controller.findOne('1')).toEqual(article);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  //test update article
  describe('update', () => {
    const articleUpdate: CreateArticleDto = {
      titre: 'Test article',
      date_creation: new Date('2005-06-07'),
      date_suppression: new Date('2006-05-04'),
      url_img: 'https://example.com/image.jpg',
      img_description: 'An example image',
      img_titre: 'Example image',
      sous_titre: 'Test subtitle',
      contenu: 'Test content',
      description: 'Test description',
      meta_title: 'Test meta title',
      categories: 'Test category',
      url_video: 'https://example.com/video.mp4',
      slug: 'test-article',
      tags: 'Test tag',
      status: 'published',
    };

    it('should return updated article', async () => {
      const updatedArticle = { id: 1, ...articleUpdate };
      (service.updateArticle as jest.Mock).mockResolvedValue(updatedArticle);

      expect(await controller.update('1', articleUpdate)).toEqual(
        updatedArticle,
      );
      expect(service.updateArticle).toHaveBeenCalledWith(1, articleUpdate);
    });
  });

  // test remove article
  describe('remove', () => {
    const articleRemove: CreateArticleDto = {
      titre: 'Test article',
      date_creation: new Date('2005-06-07'),
      date_suppression: new Date('2006-05-04'),
      url_img: 'https://example.com/image.jpg',
      img_description: 'An example image',
      img_titre: 'Example image',
      sous_titre: 'Test subtitle',
      contenu: 'Test content',
      description: 'Test description',
      meta_title: 'Test meta title',
      categories: 'Test category',
      url_video: 'https://example.com/video.mp4',
      slug: 'test-article',
      tags: 'Test tag',
      status: 'published',
    };

    it('should delete article', async () => {
      const deletedArticle = { id: 1, ...articleRemove };
      (service.remove as jest.Mock).mockReturnValue(deletedArticle);
      expect(await controller.remove('1')).toEqual(deletedArticle);
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
