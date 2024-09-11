import {PresentationInterface} from "../presentation.interface";
import {TodoRepository} from "../../domain/repository";
import express from "express";
import {TodoController} from "./todo.controller";
import {TodoRouter} from "./todo.router";

export class ServerPresentation implements PresentationInterface {

  private readonly server: express.Application;

  constructor(
    private todoRepository: TodoRepository,
    private port: number
  ) {
    this.server = express();
    this.server.use(express.json());
    this.server.use(express.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
    const controller = new TodoController(this.todoRepository);
    const todoRouter = new TodoRouter(controller);
    this.server.use('/api/todos',todoRouter.getRouter());
  }

  async run(params: object | undefined): Promise<void> {
    this.server.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`);
    });
  }

}