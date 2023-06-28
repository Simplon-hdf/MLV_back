import { Injectable, NestMiddleware } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VisitorCounterMiddleware implements NestMiddleware {
  constructor(private prisma: PrismaService) {}
  // public visitorCount = 0;

  async use(req: any, res: any, next: () => void) {
    const visitor = await this.prisma.visitor.upsert({
      where: { id: 1 },
      create: { visits: 1 },
      update: { visits: { increment: 1 } },
    });

    console.log(`Number of visitors: ${visitor.visits}`);

    next();
  }
}
