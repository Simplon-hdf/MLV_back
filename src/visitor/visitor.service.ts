import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { visitor } from '@prisma/client';

@Injectable()
export class VisitorService {
  private visitorCount = 0;
  constructor(private prisma: PrismaService) {}

  async getTotalVisitors() {
    const visitors = await this.prisma.visitor.findMany();
    const total = visitors.reduce((acc, visitor) => acc + visitor.visits, 0);
    return total;
  }

  async incrementation(app) {
    app.use((req, res, next) => {
      if (req.method === 'Get' && req.path === '/') {
        this.visitorCount++;
      }
      next();
    });
  }
}
