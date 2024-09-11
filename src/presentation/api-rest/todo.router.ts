import {TodoController} from "./todo.controller";
import {Router} from "express";

export class TodoRouter {
  private readonly router = Router();
  constructor(
    private readonly controller: TodoController
  ) {
    this.router.post('/', this.controller.create.bind(this.controller));
    this.router.get('/', this.controller.list.bind(this.controller));
    this.router.get('/:id', this.controller.get.bind(this.controller));
    this.router.delete('/:id', this.controller.delete.bind(this.controller));
    this.router.patch('/:id/toggle', this.controller.toggle.bind(this.controller));
  }

  public getRouter() {
    return this.router;
  }


}