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
exports.CreateTodoUsecase = void 0;
const query_error_1 = require("../../domain/errors/query.error");
class CreateTodoUsecase {
    constructor(todoRepository) {
        this.todoRepository = todoRepository;
    }
    execute(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title } = params;
            if (!title) {
                throw new query_error_1.QueryError('title is required');
            }
            return this.todoRepository.create(title);
        });
    }
}
exports.CreateTodoUsecase = CreateTodoUsecase;
