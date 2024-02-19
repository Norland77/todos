import { Controller } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TaskDto } from './dto/task.dto';
import { Priority, Status } from '@prisma/client';
import { TaskEditDto } from './dto/task-edit.dto';

@Controller('task')
export class TaskRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findTaskById(id: string) {
    return this.prismaService.task.findFirst({
      where: {
        id,
      },
    });
  }

  createTask(dto: TaskDto, listId?: string, taskId?: string) {
    return this.prismaService.task.create({
      data: {
        listId,
        name: dto.name,
        taskId,
        description: dto.description,
        Priority:
          dto.priority === 'High'
            ? Priority.High
            : dto.priority === 'Medium'
              ? Priority.Medium
              : Priority.Low,
        Status: Status.Pending,
      },
    });
  }

  deleteTask(id: string) {
    return this.prismaService.task.delete({
      where: {
        id,
      },
    });
  }

  editTask(id: string, dto: TaskEditDto) {
    return this.prismaService.task.update({
      where: {
        id,
      },
      data: {
        name: dto.name,
        Priority:
          dto.priority === 'High'
            ? Priority.High
            : dto.priority === 'Medium'
              ? Priority.Medium
              : Priority.Low,
        Status:
          dto.status === 'Pending'
            ? Status.Pending
            : dto.status === 'InProgress'
              ? Status.InProgress
              : dto.status === 'Completed'
                ? Status.Completed
                : dto.status === 'Cancelled'
                  ? Status.Cancelled
                  : Status.Pending,
        description: dto.description,
      },
    });
  }
}
