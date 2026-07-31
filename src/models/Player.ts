/**
 * Represents a player in the game.
 */
export class Player {
  constructor(
    public readonly name: string,
    private score = 0,
  ) {}

  /**   * Increments the player's score by one.
   */
  public addPoint(): void {
    this.score++;
  }

  /**
   * Gets the current score of the player.
   * @returns The current score of the player.
   */
  public getScore(): number {
    return this.score;
  }

  /**
   * Gets the name of the player.
   * @returns The name of the player.
   */
  public getName(): string {
    return this.name;
  }
}
