export class Player {
  constructor(
    public readonly name: string,
    private score = 0,
  ) {}

  public addPoint(): void {
    this.score++;
  }

  public getScore(): number {
    return this.score;
  }

  public getName(): string {
    return this.name;
  }
}
