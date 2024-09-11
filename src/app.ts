import * as dotenv from 'dotenv';
dotenv.config();
import {CliPresentation} from "./presentation/cli";
import {PresentationInterface} from "./presentation/presentation.interface";
import {TodoRepositoryImpl} from "./infraestructure/repositories/todo.repository.impl";
import {MemoryDatasource} from "./infraestructure/datasources/memory.datasource";
import {FileSystemDatasource} from "./infraestructure/datasources/file-system.datasource";
import * as path from "node:path";
import {ServerPresentation} from "./presentation/api-rest/server.presentation";

// Dependency Injection
// const datasource = new MemoryDatasource();
const datasource = new FileSystemDatasource(path.join(__dirname, '../data/file-system/data.json'));
//

const todoRepository = new TodoRepositoryImpl(datasource);
// const presentation = new CliPresentation(todoRepository);
const presentation = new ServerPresentation(todoRepository, process.env.PORT ? parseInt(process.env.PORT) : 3000);

class App {
  constructor(
    private presentation: PresentationInterface
  ) {}

  async run(params?: object): Promise<void> {
    return this.presentation.run(params);
  }
}

const main = async (): Promise<void> => {
  const app = new App(presentation);
  await app.run();
}

(async () => {
  await main();
})();