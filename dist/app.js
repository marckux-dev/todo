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
const todo_repository_impl_1 = require("./infraestructure/repositories/todo.repository.impl");
const file_system_datasource_1 = require("./infraestructure/datasources/file-system.datasource");
const path = __importStar(require("node:path"));
const server_presentation_1 = require("./presentation/api-rest/server.presentation");
// Dependency Injection
// const datasource = new MemoryDatasource();
const datasource = new file_system_datasource_1.FileSystemDatasource(path.join(__dirname, '../data/file-system/data.json'));
//
const todoRepository = new todo_repository_impl_1.TodoRepositoryImpl(datasource);
// const presentation = new CliPresentation(todoRepository);
const presentation = new server_presentation_1.ServerPresentation(todoRepository, 3000);
class App {
    constructor(presentation) {
        this.presentation = presentation;
    }
    run(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.presentation.run(params);
        });
    }
}
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = new App(presentation);
    yield app.run();
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield main();
}))();
