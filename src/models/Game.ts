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

  public start(): void {
    this.deck.create();
    this.initializeTurnHandling();
    this.sendStateUpdate();
  }

  private initializeTurnHandling(): void {
    this.handleCardClick();
  }

  private sendStateUpdate(): void {
    this.onStateChange?.({
      scores: [this.players[0].getScore(), this.players[1].getScore()],
      currentPlayer: this.currentPlayer,
    });
  }

  private checkMatch(): void {
    if (this.isMatch()) {
      this.handleMatch();
      return;
    }

    this.nextTurn();
  }

  private isMatch(): boolean {
    const [firstCard, secondCard] = this.flippedCards;
    return firstCard.symbol === secondCard.symbol;
  }

  private handleMatch(): void {
    this.matchCards();
    this.awardPoint();
    this.resetFlippedCards();
    this.sendStateUpdate();
    this.gameOver();
  }

  private matchCards(): void {
    const [firstCard, secondCard] = this.flippedCards;
    firstCard.match();
    secondCard.match();
  }

  private awardPoint(): void {
    this.players[this.currentPlayer].addPoint();
  }

  private resetFlippedCards(): void {
    this.flippedCards = [];
  }

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

  private lockGame(): void {
    this.isLocked = true;
  }

  private unlockGame(): void {
    this.isLocked = false;
  }

  private unflipCards(): void {
    this.flippedCards.forEach((card) => card.unflip());
  }

  private switchPlayer(): void {
    this.currentPlayer = this.currentPlayer === 0 ? 1 : 0;
  }

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

  private getClickedCard(event: MouseEvent): Card | null {
    const target = event.target as HTMLElement;
    const cardElement = target.closest(".card") as HTMLButtonElement | null;

    if (!cardElement) return null;

    const cardId = Number(cardElement.dataset.cardId);
    return this.deck.getCards().find((item) => item.id === cardId) ?? null;
  }

  private gameOver(): void {
    if (!this.isGameFinished()) return;

    this.showGameOverScreen();
  }

  private isGameFinished(): boolean {
    return this.deck.getCards().every((card) => card.matched);
  }

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
