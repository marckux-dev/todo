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
exports.TodoRepositoryImpl = void 0;
class TodoRepositoryImpl {
    constructor(todoDatasource) {
        this.todoDatasource = todoDatasource;
    }
    create(title) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.todoDatasource.create(title);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.todoDatasource.delete(id);
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.todoDatasource.get(id);
        });
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.todoDatasource.list();
        });
    }
    update(id, title, done) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.todoDatasource.update(id, title, done);
        });
    }
}
exports.TodoRepositoryImpl = TodoRepositoryImpl;
