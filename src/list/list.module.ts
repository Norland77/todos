import { Module } from '@nestjs/common';
import { ListService } from './list.service';
import { ListController } from './list.controller';
import { ListRepository } from './list.repository';

@Module({
  providers: [ListService, ListRepository],
  controllers: [ListController, ListRepository],
  exports: [ListService],
})
export class ListModule {}
