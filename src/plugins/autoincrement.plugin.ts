import {IdProviderInterface} from "../infraestructure/datasources/id-provider.interface";


export class AutoincrementPlugin implements IdProviderInterface {

  constructor(
    private counter: number = 0,
  ){}

  generate(): string {
    return String(this.counter++);
  }

  setCounter(counter: number): void {
    this.counter = counter;
  }

}