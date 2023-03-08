import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UtilisateursModule } from './utilisateurs/utilisateurs.module';
import { PrismaService } from './prisma/prisma.service';
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';
import { ArticleModule } from './article/article.module';
import { MailModule } from './mail/mail.module';
import { ConfigModule } from '@nestjs/config';
<<<<<<< HEAD
import { MessagesModule } from './messages/messages.module';
import { ImagesModule } from './images/images.module';
import { JwtModule } from '@nestjs/jwt';
=======
import { MessagesService } from './messages/messages.service';
import { ImagesService } from './images/images.service';
import { ImagesModule } from './images/images.module';
>>>>>>> feature/delete/image

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule,
    UtilisateursModule,
    ArticleModule,
    PagesModule,
    AuthModule,
    MailModule,
<<<<<<< HEAD
    MessagesModule,
    ImagesModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
=======
    ImagesModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, MessagesService, ImagesService],
>>>>>>> feature/delete/image
})
export class AppModule {}
