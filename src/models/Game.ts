import { Card } from "./Card";
import { Deck } from "./Deck";
import { ThemeName } from "../themes";
import { Player } from "./Player";
import { GameOver } from "./GameOver";

export type GameState = {
  scores: [number, number];
  currentPlayer: 0 | 1;
};

type GameStateListener = (state: GameState) => void;

/** * Represents the memory game, managing the deck, players, and game logic.
 */
export class Game {
  private readonly deck: Deck;
  private readonly field: HTMLDivElement;
  private readonly theme: ThemeName;
  private flippedCards: Card[] = [];
  private isLocked = false;
  private players: Player[];
  private currentPlayer: 0 | 1 = 0;
  private readonly onStateChange?: GameStateListener;
  private readonly gameOverScreen: GameOver;

  /**
   * Initializes a new instance of the Game class.
   * @param field - The HTMLDivElement where the game will be rendered.
   * @param size - The number of cards in the deck (must be even).
   * @param theme - The theme of the game, determining the card symbols.
   * @param playerNames - An optional tuple containing the names of the two players. Defaults to ["Blue", "Orange"].
   * @param onStateChange - An optional callback function that will be called whenever the game state changes.
   */
  constructor(
    field: HTMLDivElement,
    size: number,
    theme: ThemeName,
    playerNames: [string, string] = ["Blue", "Orange"],
    onStateChange?: GameStateListener,
  ) {
    this.field = field;
    this.theme = theme;
    this.deck = new Deck(field, size, theme);
    this.players = [new Player(playerNames[0]), new Player(playerNames[1])];
    this.onStateChange = onStateChange;
    this.gameOverScreen = new GameOver();
  }

  /**
   * Starts the game by creating the deck, initializing turn handling, and sending the initial state update.
   */
  public start(): void {
    this.deck.create();
    this.initializeTurnHandling();
    this.sendStateUpdate();
  }

  /**
   * Initializes the handling of turns by setting up the card click event listener.
   */
  private initializeTurnHandling(): void {
    this.handleCardClick();
  }

  /**
   * Sends the current game state to the registered state change listener, if any.
   */
  private sendStateUpdate(): void {
    this.onStateChange?.({
      scores: [this.players[0].getScore(), this.players[1].getScore()],
      currentPlayer: this.currentPlayer,
    });
  }

  /**
   * Checks if the two flipped cards match and handles the game logic accordingly.
   */
  private checkMatch(): void {
    if (this.isMatch()) {
      this.handleMatch();
      return;
    }

    this.nextTurn();
  }

  /**
   * Determines if the two flipped cards match based on their symbols.
   * @returns True if the two flipped cards match, false otherwise.
   */
  private isMatch(): boolean {
    const [firstCard, secondCard] = this.flippedCards;
    return firstCard.symbol === secondCard.symbol;
  }

  /**
   * Handles the logic when two flipped cards match, including awarding points and checking for game over.
   */
  private handleMatch(): void {
    this.matchCards();
    this.awardPoint();
    this.resetFlippedCards();
    this.sendStateUpdate();
    this.gameOver();
  }

  /**
   * Marks the two flipped cards as matched.
   */
  private matchCards(): void {
    const [firstCard, secondCard] = this.flippedCards;
    firstCard.match();
    secondCard.match();
  }

  /**
   * Awards a point to the current player.
   */
  private awardPoint(): void {
    this.players[this.currentPlayer].addPoint();
  }

  /**
   * Resets the flipped cards array.
   */
  private resetFlippedCards(): void {
    this.flippedCards = [];
  }

  /**
   * Advances the game to the next turn, unflipping cards and switching the current player.
   */
  private nextTurn(): void {
    this.lockGame();
    window.setTimeout(() => {
      this.unflipCards();
      this.resetFlippedCards();
      this.unlockGame();
      this.switchPlayer();
      this.sendStateUpdate();
    }, 800);
  }

  /**   * Locks the game to prevent further card flips.
   */
  private lockGame(): void {
    this.isLocked = true;
  }

  /**
   * Unlocks the game to allow card flips.
   */
  private unlockGame(): void {
    this.isLocked = false;
  }

  /**   * Unflips the currently flipped cards.
   */
  private unflipCards(): void {
    this.flippedCards.forEach((card) => card.unflip());
  }

  /**   * Switches the current player to the other player.
   */
  private switchPlayer(): void {
    this.currentPlayer = this.currentPlayer === 0 ? 1 : 0;
  }

  /**   * Handles the click event on a card, flipping it and checking for matches if two cards are flipped.
   */
  private handleCardClick(): void {
    this.field.addEventListener("click", (event) => {
      const card = this.getClickedCard(event);

      if (!card || this.isLocked) return;
      if (!card.flip()) return;

      this.flippedCards.push(card);

      if (this.flippedCards.length === 2) {
        this.checkMatch();
      }
    });
  }

  /**   * Retrieves the card that was clicked based on the event target.
   * @param event - The mouse event triggered by the click.
   * @returns The Card instance that was clicked, or null if no card was clicked.
   */
  private getClickedCard(event: MouseEvent): Card | null {
    const target = event.target as HTMLElement;
    const cardElement = target.closest(".card") as HTMLButtonElement | null;

    if (!cardElement) return null;

    const cardId = Number(cardElement.dataset.cardId);
    return this.deck.getCards().find((item) => item.id === cardId) ?? null;
  }

  /**
   * Checks if the game is finished by verifying if all cards are matched, and shows the game over screen if so.
   */
  private gameOver(): void {
    if (!this.isGameFinished()) return;

    this.showGameOverScreen();
  }

  /**
   * Determines if the game is finished by checking if all cards in the deck are matched.
   * @returns True if the game is finished, false otherwise.
   */
  private isGameFinished(): boolean {
    return this.deck.getCards().every((card) => card.matched);
  }

  /**
   * Displays the game over screen with the final scores and player names.
   */
  private showGameOverScreen(): void {
    this.gameOverScreen.show(
      this.players[0].getName(),
      this.players[1].getName(),
      this.players[0].getScore(),
      this.players[1].getScore(),
      this.theme,
    );
  }
}
