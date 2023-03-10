import { Controller, Get } from '@nestjs/common';
import { VisitorService } from './visitor.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('visitor')
@ApiTags('Visitor')
export class VisitorController {
  constructor(private visitorService: VisitorService) {}

  // @Post()
  // create(app) {
  //   return this.visitorService.incrementation(app);
  // }

  @Get('total')
  async getTotalVisitors() {
    const total = await this.visitorService.getTotalVisitors();
    return { total };
  }
}

// @Get(':id')
// findOne(@Param('id') id: string) {
//   return this.visitorService.findOne(+id);
// }

// @Patch(':id')
// update(@Param('id') id: string, @Body() updateVisitorDto: UpdateVisitorDto) {
//   return this.visitorService.update(+id, updateVisitorDto);
// }

// @Delete(':id')
// remove(@Param('id') id: string) {
//   return this.visitorService.remove(+id);
// }
