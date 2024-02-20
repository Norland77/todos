import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDto } from './dto/task.dto';
import { ListService } from '../list/list.service';
import { TaskEditDto } from './dto/task-edit.dto';

@Controller('task')
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
    private readonly listService: ListService,
  ) {}

  @Post('create/:ListId/:TaskId?')
  async createTask(
    @Body() dto: TaskDto,
    @Param('ListId') listId: string,
    @Param('TaskId') taskId?: string,
  ) {
    if (taskId !== undefined) {
      const task = await this.taskService.findTaskById(taskId);

      if (!task) {
        throw new BadRequestException(`Task with id: ${taskId} is not exist`);
      }

      listId = null;
    } else {
      const list = await this.listService.findListById(listId);

      if (!list) {
        throw new BadRequestException(`List with id: ${listId} is not exist`);
      }
    }

    return this.taskService.createTask(dto, taskId, listId);
  }

  @Delete('delete/:Id')
  async deleteTask(@Param('Id') id: string) {
    const task = await this.taskService.findTaskById(id);

    if (!task) {
      throw new BadRequestException(`Task with id: ${id} is not exist`);
    }

    return this.taskService.deleteTask(id);
  }

  @Put('edit/:Id')
  async editTask(@Param('Id') id: string, @Body() dto: TaskEditDto) {
    const task = await this.taskService.findTaskById(id);

    if (!task) {
      throw new BadRequestException(`Task with id: ${id} is not exist`);
    }

    return this.taskService.editTask(id, dto);
  }
}
