import { Injectable } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { TaskDto } from "./dto/task.dto";
import { TaskEditDto } from "./dto/task-edit.dto";

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async findTaskById(id: string) {
    return await this.taskRepository.findTaskById(id);
  }

  createTask(dto: TaskDto, listId: string, taskId?: string) {
    return this.taskRepository.createTask(dto, taskId, listId);
  }

  deleteTask(id: string) {
    return this.taskRepository.deleteTask(id);
  }

  editTask(id: string, dto: TaskEditDto) {
    return this.taskRepository.editTask(id, dto);
  }
}
