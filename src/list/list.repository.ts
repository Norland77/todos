import { Controller } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('list')
export class ListRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findListByName(name: string) {
    return this.prismaService.list.findFirst({
      where: {
        name,
      },
    });
  }

  async createList(name: string) {
    return this.prismaService.list.create({
      data: {
        name,
      },
    });
  }

  async findListById(id: string) {
    return this.prismaService.list.findFirst({
      where: {
        id,
      },
    });
  }

  async deleteList(id: string) {
    return this.prismaService.list.delete({
      where: {
        id,
      },
    });
  }

  async editList(id: string, name: string) {
    return this.prismaService.list.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
  }

  async getAllLists() {
    return this.prismaService.list.findMany();
  }

  async getAllTasksByList() {
    const lists = await this.prismaService.list.findMany({
      include: {
        Tasks: true,
      },
    });
    if (!lists || lists.length === 0) return [];

    const getAllSubtasks = async (tasks) => {
      return await Promise.all(
        tasks.map(async (task) => {
          const subtasks = await this.prismaService.task.findMany({
            where: {
              taskId: task.id,
            },
          });
          if (subtasks.length > 0) {
            task.subtasks = await getAllSubtasks(subtasks);
          }
          return task;
        }),
      );
    };

    await Promise.all(
      lists.map(async (list) => {
        list.Tasks = await this.prismaService.task.findMany({
          where: {
            listId: list.id,
            taskId: null,
          },
          orderBy: {
            Priority: 'desc',
          },
        });
        list.Tasks = await getAllSubtasks(list.Tasks);
      }),
    );

    return lists;
  }
}
