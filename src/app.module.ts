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
import { MessagesService } from './messages/messages.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtCookieMiddleware } from './auth/auth.middleware';

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
    JwtModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, MessagesService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtCookieMiddleware).forRoutes('*');
  }
}
