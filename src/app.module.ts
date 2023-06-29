import {
  forwardRef,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UtilisateursModule } from './utilisateurs/utilisateurs.module';
import { PrismaService } from './prisma/prisma.service';
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';
import { ArticleModule } from './article/article.module';
import { MailModule } from './mail/mail.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MessagesModule } from './messages/messages.module';
import { ImagesModule } from './images/images.module';
import { AlertModule } from './alert/alert.module';
import { VisitorCounterMiddleware } from './visitor/visitorCountMiddleware.middleware';
import { MessagesService } from './messages/messages.service';
import { ChatModule } from './chat/chat.module';

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
    ChatModule,
    MessagesModule,
    ImagesModule,
    AlertModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [
    PrismaService,
    AppService,
    VisitorCounterMiddleware,
    MessagesService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VisitorCounterMiddleware).forRoutes('*');
  }
}
