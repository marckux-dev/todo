import {TodoRepository} from "../../domain/repository";
import {TodoEntity} from "../../domain/entities";
import {UsecaseInterface} from "./usecase.interface";
import {QueryError} from "../../domain/errors/query.error";

interface CreateTodoParams {
  title: string;
}

export class CreateTodoUsecase implements UsecaseInterface {

  constructor(
    private readonly todoRepository: TodoRepository,
  ) {}

  async execute(params: CreateTodoParams): Promise<TodoEntity> {
    const { title } = params;
    if (!title) {
      throw new QueryError('title is required');
    }
    return this.todoRepository.create(title)
  }
}