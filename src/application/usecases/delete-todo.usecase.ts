import {UsecaseInterface} from "./usecase.interface";
import {TodoRepository} from "../../domain/repository";

interface DeleteTodoUsecaseParams {
  id: string
}

export class DeleteTodoUsecase implements UsecaseInterface {

  constructor(
    private readonly repository: TodoRepository
  ) {}

  async execute(params: DeleteTodoUsecaseParams): Promise<void> {
    const {id} = params;
    await this.repository.get(id);
    await this.repository.delete(id);
  }

}