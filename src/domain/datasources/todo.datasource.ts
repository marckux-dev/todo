import {TodoEntity} from "../entities";
import {IdProviderInterface} from "../../infraestructure/datasources/id-provider.interface";

export abstract class TodoDatasource {

  protected constructor(
    protected readonly idProvider: IdProviderInterface
  ) {}

  abstract create( title: string ): Promise<TodoEntity>;
  abstract update( id:string, title?: string, done?: boolean ): Promise<TodoEntity>;
  abstract delete( id:string ): Promise<void>;
  abstract get( id:string): Promise<TodoEntity>;
  abstract list(): Promise<TodoEntity[]>;

  public generateId(): string {
    return this.idProvider.generate();
  }

}