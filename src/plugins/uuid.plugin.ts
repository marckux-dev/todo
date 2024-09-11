import {IdProviderInterface} from "../infraestructure/datasources/id-provider.interface";
import {v4} from "uuid";

export class UuidPlugin implements IdProviderInterface {
  generate(): string {
    return v4();
  }
}