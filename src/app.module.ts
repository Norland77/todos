import { Module } from '@nestjs/common';
import { ListModule } from './list/list.module';
import { PrismaModule } from './prisma/prisma.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [ListModule, PrismaModule, TaskModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
