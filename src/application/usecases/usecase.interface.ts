import {TodoEntity} from "../../domain/entities";

export interface UsecaseInterface {
  execute(params?: object): Promise<TodoEntity | TodoEntity[] | void>;
}