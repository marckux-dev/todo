
export class TodoEntity {

  constructor(
    public readonly id: string,
    public title: string,
    public done: boolean = false,
    public createdAt: Date = new Date(),
    public updatedAt?: Date | undefined,
  ) {}


}