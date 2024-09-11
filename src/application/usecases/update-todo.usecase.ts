import {TodoRepository} from "../../domain/repository";
import {TodoEntity} from "../../domain/entities";
import {UsecaseInterface} from "./usecase.interface";

interface UpdateTodoUsecaseParams {
  id: string,
  title?: string,
  done?: boolean
}

export class UpdateTodoUsecase implements UsecaseInterface {
  constructor(
    private repository: TodoRepository
  ){}

  async execute(params: UpdateTodoUsecaseParams): Promise<TodoEntity> {
    const {id, title, done} = params;
    if (title !== undefined && title === '') {
      throw new Error('title is required');
    }
    await this.repository.get(id);
    return this.repository.update(id, title, done);
  }

}