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
exports.TodoController = void 0;
const usecases_1 = require("../../application/usecases");
const helpers_1 = require("./helpers");
class TodoController {
    constructor(repository) {
        this.repository = repository;
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title } = req.body;
            const usecase = new usecases_1.CreateTodoUsecase(this.repository);
            return (0, helpers_1.handleUseCase)({ usecase, res, params: { title }, successStatus: 201 });
        });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usecase = new usecases_1.ListTodoUsecase(this.repository);
            return (0, helpers_1.handleUseCase)({ usecase, res });
        });
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const usecase = new usecases_1.GetTodoUsecase(this.repository);
            return (0, helpers_1.handleUseCase)({ usecase, res, params: { id }, errorStatus: 404 });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const usecase = new usecases_1.DeleteTodoUsecase(this.repository);
            return (0, helpers_1.handleUseCase)({ usecase, res, params: { id }, successStatus: 204, errorStatus: 404 });
        });
    }
    toggle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const usecase = new usecases_1.ToggleTodoUsecase(this.repository);
            return (0, helpers_1.handleUseCase)({ usecase, res, params: { id }, errorStatus: 404 });
        });
    }
}
exports.TodoController = TodoController;
