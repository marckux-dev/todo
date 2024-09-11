"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoEntity = void 0;
class TodoEntity {
    constructor(id, title, done = false, createdAt = new Date(), updatedAt) {
        this.id = id;
        this.title = title;
        this.done = done;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
exports.TodoEntity = TodoEntity;
