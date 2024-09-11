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
exports.MemoryDatasource = void 0;
const datasources_1 = require("../../domain/datasources");
const entities_1 = require("../../domain/entities");
const query_error_1 = require("../../domain/errors/query.error");
const autoincrement_plugin_1 = require("../../plugins/autoincrement.plugin");
class MemoryDatasource extends datasources_1.TodoDatasource {
    constructor() {
        super(new autoincrement_plugin_1.AutoincrementPlugin());
        this.todos = [];
    }
    setTodos(todos) {
        this.todos = todos;
        // Set the counter to the highest id + 1
        const lastId = this.todos.reduce((acc, todo) => Math.max(acc, parseInt(todo.id)), 0) + 1;
        this.idProvider.setCounter(lastId);
    }
    getTodos() {
        return this.todos;
    }
    create(title) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = this.generateId();
            const newTodo = new entities_1.TodoEntity(id, title);
            this.todos.push(newTodo);
            return newTodo;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = this.todos.findIndex(todo => todo.id === id);
            this.todos.splice(index, 1);
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = this.todos.findIndex(todo => todo.id === id);
            if (index === -1) {
                throw new query_error_1.QueryError(`Todo with id ${id} not found`);
            }
            return this.todos[index];
        });
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.todos;
        });
    }
    update(id, title, done) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = this.todos.findIndex(todo => todo.id === id);
            const todo = this.todos[index];
            (title !== undefined) && (todo.title = title);
            (done !== undefined) && (todo.done = done);
            todo.updatedAt = new Date();
            return todo;
        });
    }
}
exports.MemoryDatasource = MemoryDatasource;
