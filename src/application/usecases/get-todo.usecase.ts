import {TodoEntity} from "../../domain/entities";
import {TodoRepository} from "../../domain/repository";
import {UsecaseInterface} from "./usecase.interface";

interface GetTodoUsecaseParams {
  id: string
}

export class GetTodoUsecase implements UsecaseInterface {

  constructor(
    private repository: TodoRepository
  ){}

  async execute(params: GetTodoUsecaseParams): Promise<TodoEntity> {
    const {id} = params;
    return this.repository.get(id);
  }

}