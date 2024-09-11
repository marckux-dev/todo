import {UsecaseInterface} from "./usecase.interface";
import {TodoEntity} from "../../domain/entities";
import {TodoRepository} from "../../domain/repository";

interface ToggleTodoUsecaseParams {
  id: string;
}

export class ToggleTodoUsecase implements UsecaseInterface {

  constructor(
    private readonly repository: TodoRepository
  ) {}

  async execute(params: ToggleTodoUsecaseParams): Promise<TodoEntity> {
    const {id} = params;
    const todo = await this.repository.get(id);
    const done = !todo.done;
    return this.repository.update(id, undefined, done);
  }

}