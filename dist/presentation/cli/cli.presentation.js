"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CliPresentation = void 0;
const cli_helpers_1 = require("./cli.helpers");
const list_todo_usecase_1 = require("../../application/usecases/list-todo.usecase");
const usecases_1 = require("../../application/usecases");
const delete_todo_usecase_1 = require("../../application/usecases/delete-todo.usecase");
class CliPresentation {
    constructor(todoRepository) {
        this.todoRepository = todoRepository;
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            while (true) {
                const command = (yield (0, cli_helpers_1.getValidInput)('> ')).trim();
                if (command === 'exit') {
                    break;
                }
                else if (command === 'help') {
                    console.log('Commands:');
                    console.log('list           --- List all todos');
                    console.log('get <id>       --- Get a todo by id');
                    console.log('create <title> --- Create a new todo');
                    console.log('delete <id>    --- Delete a todo by id');
                    console.log('toggle <id>    --- Toggle the done status of a todo');
                    console.log('exit           --- Exit the program');
                }
                else if (command === 'list') {
                    const listCommand = new list_todo_usecase_1.ListTodoUsecase(this.todoRepository);
                    const todos = yield listCommand.execute();
                    console.log(todos);
                }
                else if (command.startsWith('get')) {
                    const id = command.split(' ')[1];
                    const getCommand = new usecases_1.GetTodoUsecase(this.todoRepository);
                    const todo = yield getCommand.execute({ id });
                    console.log(todo);
                }
                else if (command.startsWith('create')) {
                    // Get the title from the command
                    // The title is from the second word of the command to the end
                    const title = command.split(' ').slice(1).join(' ');
                    const createCommand = new usecases_1.CreateTodoUsecase(this.todoRepository);
                    const todo = yield createCommand.execute({ title });
                    console.log(todo);
                }
                else if (command.startsWith('delete')) {
                    const id = command.split(' ')[1];
                    const deleteCommand = new delete_todo_usecase_1.DeleteTodoUsecase(this.todoRepository);
                    yield deleteCommand.execute({ id });
                    console.log(`Todo with id: ${id} deleted`);
                }
                else if (command.startsWith('toggle')) {
                    const id = command.split(' ')[1];
                    const getCommand = new usecases_1.GetTodoUsecase(this.todoRepository);
                    const todo = yield getCommand.execute({ id });
                    const done = !todo.done;
                    const updateCommand = new usecases_1.UpdateTodoUsecase(this.todoRepository);
                    const updatedTodo = yield updateCommand.execute({ id, done });
                    console.log(updatedTodo);
                }
                else {
                    console.log('Invalid command');
                }
            }
        });
    }
}
exports.CliPresentation = CliPresentation;
