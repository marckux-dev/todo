import {TodoDatasource} from "../../domain/datasources";
import {TodoEntity} from "../../domain/entities";
import {QueryError} from "../../domain/errors/query.error";
import {AutoincrementPlugin} from "../../plugins/autoincrement.plugin";

export class MemoryDatasource extends TodoDatasource {

  private todos: TodoEntity[] = [];

  constructor() {
    super(new AutoincrementPlugin());
  }

  setTodos(todos: TodoEntity[]) {
    this.todos = todos;
    // Set the counter to the highest id + 1
    const lastId = this.todos.reduce((acc, todo) => Math.max(acc, parseInt(todo.id)), 0) + 1;
    (this.idProvider as AutoincrementPlugin).setCounter(lastId);
  }

  getTodos() {
    return this.todos;
  }

  async create(title: string): Promise<TodoEntity> {
    const id = this.generateId();
    const newTodo = new TodoEntity(id, title);
    this.todos.push(newTodo);
    return newTodo;
  }

  async delete(id: string): Promise<void> {
    const index = this.todos.findIndex(todo => todo.id === id);
    this.todos.splice(index, 1);
  }

  async get(id: string): Promise<TodoEntity> {
    const index = this.todos.findIndex(todo => todo.id === id);
    if (index === -1) {
      throw new QueryError(`Todo with id ${id} not found`);
    }
    return this.todos[index];
  }

  async list(): Promise<TodoEntity[]> {
    return this.todos;
  }

  async update(id: string, title?: string, done?: boolean): Promise<TodoEntity> {
    const index = this.todos.findIndex(todo => todo.id === id);
    const todo = this.todos[index];
    (title !== undefined) && (todo.title = title);
    (done !== undefined) && (todo.done = done);
    todo.updatedAt = new Date();
    return todo;
  }

}