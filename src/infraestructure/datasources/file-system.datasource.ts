import {TodoDatasource} from "../../domain/datasources";
import {TodoEntity} from "../../domain/entities";
import * as fs from "node:fs";
import {AutoincrementPlugin} from "../../plugins/autoincrement.plugin";
import {MemoryDatasource} from "./memory.datasource";

export class FileSystemDatasource extends TodoDatasource {

  private readonly memoryDatasource: MemoryDatasource = new MemoryDatasource();

  constructor(
    private readonly path: string,
  ) {
    // Initialize
    super(new AutoincrementPlugin());
    if (!fs.existsSync(this.path)) {
      fs.writeFileSync(this.path, JSON.stringify([]));
    }
    this.load().then(() => console.log('File datasource loaded'));
  }

  private async load(): Promise<void> {
    const jsonTodos = JSON.parse(fs.readFileSync(this.path).toString());
    const todos = jsonTodos.map((todo: any) => new TodoEntity(
      todo.id,
      todo.title,
      todo.done,
      new Date(todo.createdAt),
      todo.updatedAt ? new Date(todo.updatedAt) : undefined
    ));
    this.memoryDatasource.setTodos(todos);
  }

  private async save(): Promise<void> {
    fs.writeFileSync(this.path, JSON.stringify(this.memoryDatasource.getTodos()));
  }

  async create(title: string): Promise<TodoEntity> {
    const todo = await this.memoryDatasource.create(title);
    return this.save().then(() => todo);
  }

  async delete(id: string): Promise<void> {
    await this.memoryDatasource.delete(id);
    return this.save();
  }

  async get(id: string): Promise<TodoEntity> {
    const todo = await this.memoryDatasource.get(id);
    return this.save().then(() => todo);
  }

  async list(): Promise<TodoEntity[]> {
    return this.memoryDatasource.list();
  }

  async update(id: string, title?: string, done?: boolean): Promise<TodoEntity> {
    const todo = await this.memoryDatasource.update(id, title, done);
    return this.save().then(() => todo);
  }

}