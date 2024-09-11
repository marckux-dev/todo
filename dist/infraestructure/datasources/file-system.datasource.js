"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.FileSystemDatasource = void 0;
const datasources_1 = require("../../domain/datasources");
const entities_1 = require("../../domain/entities");
const fs = __importStar(require("node:fs"));
const autoincrement_plugin_1 = require("../../plugins/autoincrement.plugin");
const memory_datasource_1 = require("./memory.datasource");
class FileSystemDatasource extends datasources_1.TodoDatasource {
    constructor(path) {
        // Initialize
        super(new autoincrement_plugin_1.AutoincrementPlugin());
        this.path = path;
        this.memoryDatasource = new memory_datasource_1.MemoryDatasource();
        if (!fs.existsSync(this.path)) {
            fs.writeFileSync(this.path, JSON.stringify([]));
        }
        this.load().then(() => console.log('File datasource loaded'));
    }
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            const jsonTodos = JSON.parse(fs.readFileSync(this.path).toString());
            const todos = jsonTodos.map((todo) => new entities_1.TodoEntity(todo.id, todo.title, todo.done, new Date(todo.createdAt), todo.updatedAt ? new Date(todo.updatedAt) : undefined));
            this.memoryDatasource.setTodos(todos);
        });
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            fs.writeFileSync(this.path, JSON.stringify(this.memoryDatasource.getTodos()));
        });
    }
    create(title) {
        return __awaiter(this, void 0, void 0, function* () {
            const todo = yield this.memoryDatasource.create(title);
            return this.save().then(() => todo);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.memoryDatasource.delete(id);
            return this.save();
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const todo = yield this.memoryDatasource.get(id);
            return this.save().then(() => todo);
        });
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.memoryDatasource.list();
        });
    }
    update(id, title, done) {
        return __awaiter(this, void 0, void 0, function* () {
            const todo = yield this.memoryDatasource.update(id, title, done);
            return this.save().then(() => todo);
        });
    }
}
exports.FileSystemDatasource = FileSystemDatasource;
