import {TodoRepository} from "../../domain/repository";
import {TodoEntity} from "../../domain/entities";
import {TodoDatasource} from "../../domain/datasources";

export class TodoRepositoryImpl implements TodoRepository {

  constructor(
    private readonly todoDatasource: TodoDatasource,
  ) {}

  async create(title: string): Promise<TodoEntity> {
    return this.todoDatasource.create(title);
  }

  async delete(id: string): Promise<void> {
    return this.todoDatasource.delete(id);
  }

  async get(id: string): Promise<TodoEntity> {
    return this.todoDatasource.get(id);
  }

  async list(): Promise<TodoEntity[]> {
    return this.todoDatasource.list();
  }

  async update(id: string, title?: string, done?: boolean): Promise<TodoEntity> {
    return this.todoDatasource.update(id, title, done);
  }

}