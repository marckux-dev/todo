import {UsecaseInterface} from "./usecase.interface";
import {TodoEntity} from "../../domain/entities";
import {TodoRepository} from "../../domain/repository";

export class ListTodoUsecase implements UsecaseInterface {

  constructor(
    private readonly todoRepository: TodoRepository,
  ) {}

  async execute(): Promise<TodoEntity[]> {
    return this.todoRepository.list();
  }

}