import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ListService } from './list.service';
import { ListDto } from './dto/list.dto';

@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Post('create')
  async createList(@Body() dto: ListDto) {
    if (dto.name === '') {
      throw new BadRequestException();
    }

    const list = await this.listService.findListByName(dto.name);

    if (list) {
      throw new BadRequestException('list with this name is already exist');
    }

    return await this.listService.createList(dto.name);
  }

  @Delete('delete/:Id')
  async deleteList(@Param('Id') id: string) {
    const list = await this.listService.findListById(id);

    if (!list) {
      throw new BadRequestException(`list with id ${id} is not exist`);
    }

    return await this.listService.deleteList(id);
  }

  @Put('edit/:Id')
  async editList(@Param('Id') id: string, @Body() dto: ListDto) {
    const listId = await this.listService.findListById(id);

    if (!listId) {
      throw new BadRequestException(`list with id ${id} is not exist`);
    }

    const listName = await this.listService.findListByName(dto.name);

    if (listName) {
      throw new BadRequestException('list with this name is already exist');
    }

    return await this.listService.editList(id, dto.name);
  }

  @Get('all')
  async getAllLists() {
    return await this.listService.getAllLists();
  }

  @Get('tasks')
  async getAllTasksByList() {
    return this.listService.getAllTasksByList();
  }
}
