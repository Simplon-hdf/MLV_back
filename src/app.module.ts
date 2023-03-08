import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UtilisateursModule } from './utilisateurs/utilisateurs.module';
import { PrismaService } from './prisma/prisma.service';
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';
import { ArticleModule } from './article/article.module';
import { MailModule } from './mail/mail.module';
import { ConfigModule } from '@nestjs/config';
import { MessagesService } from './messages/messages.service';
import { ImagesService } from './images/images.service';
import { ImagesModule } from './images/images.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UtilisateursModule,
    ArticleModule,
    PagesModule,
    AuthModule,
    MailModule,
    ImagesModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, MessagesService, ImagesService],
})
export class AppModule {}
