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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerPresentation = void 0;
const express_1 = __importDefault(require("express"));
const todo_controller_1 = require("./todo.controller");
const todo_router_1 = require("./todo.router");
class ServerPresentation {
    constructor(todoRepository, port) {
        this.todoRepository = todoRepository;
        this.port = port;
        this.server = (0, express_1.default)();
        this.server.use(express_1.default.json());
        this.server.use(express_1.default.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
        const controller = new todo_controller_1.TodoController(this.todoRepository);
        const todoRouter = new todo_router_1.TodoRouter(controller);
        this.server.use('/api/todos', todoRouter.getRouter());
    }
    run(params) {
        return __awaiter(this, void 0, void 0, function* () {
            this.server.listen(this.port, () => {
                console.log(`Server listening on port ${this.port}`);
            });
        });
    }
}
exports.ServerPresentation = ServerPresentation;
