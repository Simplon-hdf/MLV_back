import { Test, TestingModule } from '@nestjs/testing';
import { ArticleService } from './article.service';
import { post } from '.prisma/client';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from '../prisma/prisma.service';

describe('ArticleService', () => {
  let service: ArticleService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArticleService, PrismaService],
    }).compile();

    service = module.get<ArticleService>(ArticleService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  afterEach(async () => {
    await prisma.post.deleteMany();
  });

  // test create
  describe('createArticle', () => {
    it('should create an article', async () => {
      const createArticleDto: CreateArticleDto = {
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
      const createdArticle: post = await service.createArticle(
        createArticleDto,
      );

      jest.spyOn(prisma.post, 'create').mockResolvedValueOnce(createdArticle);

      const result = await prisma.post.create({ data: createArticleDto });
      expect(prisma.post.create).toHaveBeenCalledWith({
        data: createArticleDto,
      });
      expect(result).toEqual(createdArticle);
    });
  });
  // test findAll
  describe('findAll', () => {
    it('should return an array of articles', async () => {
      const createArticleDto: CreateArticleDto = {
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
      const createArticleDto2: CreateArticleDto = {
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
      await service.createArticle(createArticleDto);
      await service.createArticle(createArticleDto2);
      const articles = await service.findAll();
      expect(articles).toBeInstanceOf(Array);
    });
  });
  // test findOne
  describe('findOne', () => {
    it('should return an article by id', async () => {
      const createArticleDto: CreateArticleDto = {
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
      const createdArticle = await service.createArticle(createArticleDto);
      const foundArticle = await service.findOne(createdArticle.id);
      expect(foundArticle).toBeDefined();
      expect(foundArticle.id).toEqual(createdArticle.id);
    });
  });
  //test update
  describe('updateArticle', () => {
    it('should update an article by id', async () => {
      const createArticleDto: CreateArticleDto = {
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
      const createdArticle = await service.createArticle(createArticleDto);
      // update the article
      const updateArticleDto: UpdateArticleDto = {
        titre: ' Update Test article',
        date_creation: new Date(),
        date_suppression: new Date(),
        url_img: 'https://example.com/updated-image.jpg',
        img_description: 'Update An example image',
        img_titre: 'Update Example image',
        sous_titre: 'Update Test subtitle',
        contenu: 'Update Test content',
        description: 'Update Test description',
        meta_title: 'Update Test meta title',
        categories: 'Update Test category',
        url_video: 'https://example.com/update-video.mp4',
        slug: 'Update test-article',
        tags: 'Update Test tag',
        status: 'Update published',
      };
      const updatedArticle = await service.updateArticle(
        createdArticle.id,
        updateArticleDto,
      );
      // check that the article was updated correctly
      expect(updatedArticle.id).toEqual(createdArticle.id);
      expect(updatedArticle.titre).toEqual(updateArticleDto.titre);
      expect(updatedArticle.date_creation).toEqual(
        createdArticle.date_creation,
      );
      expect(updatedArticle.date_suppression).not.toEqual(
        createdArticle.date_suppression,
      );
      expect(updatedArticle.url_img).toEqual(updateArticleDto.url_img);
      expect(updatedArticle.img_description).toEqual(
        updateArticleDto.img_description,
      );
      expect(updatedArticle.img_titre).toEqual(updateArticleDto.img_titre);
      expect(updatedArticle.sous_titre).toEqual(updateArticleDto.sous_titre);
      expect(updatedArticle.contenu).toEqual(updateArticleDto.contenu);
      expect(updatedArticle.description).toEqual(updateArticleDto.description);
      expect(updatedArticle.meta_title).toEqual(updateArticleDto.meta_title);
      expect(updatedArticle.categories).toEqual(updateArticleDto.categories);
    });
  });
  // test remove
  describe('remove', () => {
    it('should remove an article by id', async () => {
      const createArticleDto: CreateArticleDto = {
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
      const createdArticle = await service.createArticle(createArticleDto);
      const createdArticleId = createdArticle.id;

      // remove the article
      const removedArticle = await service.remove(createdArticleId);

      // ensure the removed article is not returned by findOne
      const foundArticle = await service.findOne(createdArticleId);
      expect(foundArticle).toBe(null);

      // ensure the date_suppression is set on the removed article
      expect(removedArticle.date_suppression).toBeInstanceOf(Date);

      // ensure the date_suppression is not the same as the date_creation
      expect(removedArticle.date_suppression).not.toEqual(
        createdArticle.date_creation,
      );
    });
  });
});
