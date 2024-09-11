import {TodoEntity} from "../entities";

export abstract class TodoRepository {
  abstract create(title: string): Promise<TodoEntity>;
  abstract update(id: string, title?: string, done?: boolean): Promise<TodoEntity>;
  abstract delete(id: string): Promise<void>;
  abstract get(id: string): Promise<TodoEntity>;
  abstract list(): Promise<TodoEntity[]>;
}