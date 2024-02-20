import { Injectable } from '@nestjs/common';
import { ListRepository } from './list.repository';

@Injectable()
export class ListService {
  constructor(private readonly listRepository: ListRepository) {}

  async findListByName(name: string) {
    return await this.listRepository.findListByName(name);
  }

  async createList(name: string) {
    return await this.listRepository.createList(name);
  }

  async findListById(id: string) {
    return await this.listRepository.findListById(id);
  }

  async deleteList(id: string) {
    return await this.listRepository.deleteList(id);
  }

  async editList(id: string, name: string) {
    return await this.listRepository.editList(id, name);
  }

  async getAllLists() {
    return await this.listRepository.getAllLists();
  }

  getAllTasksByList() {
    return this.listRepository.getAllTasksByList();
  }
}
