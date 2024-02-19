import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TaskRepository } from './task.repository';
import { ListModule } from '../list/list.module';

@Module({
  providers: [TaskService, TaskRepository],
  controllers: [TaskController, TaskRepository],
  imports: [ListModule],
})
export class TaskModule {}
