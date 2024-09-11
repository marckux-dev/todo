import {PresentationInterface} from "../presentation.interface";
import {TodoRepository} from "../../domain/repository";
import {getValidInput} from "./cli.helpers";
import {ListTodoUsecase} from "../../application/usecases/list-todo.usecase";
import {AutoincrementPlugin} from "../../plugins/autoincrement.plugin";
import {CreateTodoUsecase, GetTodoUsecase, UpdateTodoUsecase} from "../../application/usecases";
import {DeleteTodoUsecase} from "../../application/usecases/delete-todo.usecase";

export class CliPresentation implements PresentationInterface {

  constructor(
    private todoRepository: TodoRepository
  ) {}

  async run(): Promise<void> {
    while (true) {
      const command = (await getValidInput('> ')).trim();
      if (command === 'exit') {
        break;
      } else if (command === 'help') {
        console.log('Commands:');
        console.log('list           --- List all todos');
        console.log('get <id>       --- Get a todo by id');
        console.log('create <title> --- Create a new todo');
        console.log('delete <id>    --- Delete a todo by id');
        console.log('toggle <id>    --- Toggle the done status of a todo');
        console.log('exit           --- Exit the program');
      } else if (command === 'list')  {
        const listCommand = new ListTodoUsecase(this.todoRepository);
        const todos = await listCommand.execute();
        console.log(todos);
      } else if (command.startsWith('get')) {
        const id = command.split(' ')[1];
        const getCommand = new GetTodoUsecase(this.todoRepository);
        const todo = await getCommand.execute({id});
        console.log(todo);
      } else if (command.startsWith('create')) {
        // Get the title from the command
        // The title is from the second word of the command to the end
        const title = command.split(' ').slice(1).join(' ');
        const createCommand = new CreateTodoUsecase(this.todoRepository);
        const todo = await createCommand.execute({title});
        console.log(todo);
      } else if (command.startsWith('delete')) {
        const id = command.split(' ')[1];
        const deleteCommand = new DeleteTodoUsecase(this.todoRepository);
        await deleteCommand.execute({id});
        console.log(`Todo with id: ${id} deleted`);
      } else if (command.startsWith('toggle')) {
        const id = command.split(' ')[1];
        const getCommand = new GetTodoUsecase(this.todoRepository);
        const todo = await getCommand.execute({id});
        const done = !todo.done;
        const updateCommand = new UpdateTodoUsecase(this.todoRepository);
        const updatedTodo = await updateCommand.execute({id, done});
        console.log(updatedTodo);
      } else {
        console.log('Invalid command');
      }
    }
  }
}