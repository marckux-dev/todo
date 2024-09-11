import {TodoRepository} from "../../domain/repository";
import {Request, Response} from "express";
import {
  CreateTodoUsecase,
  DeleteTodoUsecase,
  GetTodoUsecase,
  ListTodoUsecase,
  ToggleTodoUsecase
} from "../../application/usecases";
import {handleUseCase} from "./helpers";

export class TodoController {
  constructor(
    private repository: TodoRepository
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    const {title} = req.body;
    const usecase = new CreateTodoUsecase(this.repository);
    return handleUseCase({usecase, res, params: {title}, successStatus: 201});
  }

  async list(req: Request, res: Response): Promise<Response> {
    const usecase = new ListTodoUsecase(this.repository);
    return handleUseCase({usecase, res});
  }

  async get(req: Request, res: Response): Promise<Response> {
    const {id} = req.params;
    const usecase = new GetTodoUsecase(this.repository);
    return handleUseCase({usecase, res, params: {id}, errorStatus: 404});
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const {id} = req.params;
    const usecase = new DeleteTodoUsecase(this.repository);
    return handleUseCase({usecase, res, params: {id}, successStatus: 204, errorStatus: 404});
  }

  async toggle(req: Request, res: Response): Promise<Response> {
    const {id} = req.params;
    const usecase = new ToggleTodoUsecase(this.repository);
    return handleUseCase({usecase, res, params: {id}, errorStatus: 404});
  }
}
