import { Test, TestingModule } from '@nestjs/testing';
import { ArticleService } from './article.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('ArticleService', () => {
  let service: ArticleService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArticleService, PrismaService],
    }).compile();

    service = module.get<ArticleService>(ArticleService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(async () => {
    await PrismaService.$disconnect();
  });
// test create
  describe('create', () => {
    it('should create an article', async () => {
      const data = {
        titre: 'Test article',
        date_creation: new Date(),
        date_suppression: new Date(),
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
      const createdArticle = await service.create(data);
      expect(createdArticle).toMatchObject(data);
    });
  });
 // test findAll
  describe('findAll', () => {
    it('should return an array of articles', async () => {
      const articles = await service.findAll();
      expect(Array.isArray(articles)).toBe(true);
    });
  });
  // test findOne
  describe('findOne', () => {
    it('should return an article by id', async () => {
      const article = await service.findOne(1);

      expect(article.id).toBe(1);
    });
  });
  //test update
  describe('update', () => {
    it('should update an article by id', async () => {
      const data = {
        titre: 'Updated article',
      };

      const updatedArticle = await service.update(1, data);

      expect(updatedArticle.titre).toBe(data.titre);
    });
  });
// test remove
  describe('remove', () => {
    it('should remove an article by id', async () => {
      const removedArticle = await service.remove(1);

      expect(removedArticle.id).toBe(1);
    });
  });
});
