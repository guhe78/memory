import { Card } from "./Card";
import { Deck } from "./Deck";
import { ThemeName } from "../themes";
import { Player } from "./Player";

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
  }

  public start(): void {
    this.deck.create();
    this.handleCardClick();
    this.sendStateUpdate();
  }

  private sendStateUpdate(): void {
    this.onStateChange?.({
      scores: [this.players[0].getScore(), this.players[1].getScore()],
      currentPlayer: this.currentPlayer,
    });
  }

  private checkMatch(): void {
    const [firstCard, secondCard] = this.flippedCards;

    if (firstCard.symbol === secondCard.symbol) {
      firstCard.match();
      secondCard.match();
      this.players[this.currentPlayer].addPoint();
      this.flippedCards = [];
      this.sendStateUpdate();
      this.gameOver();
      return;
    }

    this.nextTurn();
  }

  private nextTurn(): void {
    this.isLocked = true;

    window.setTimeout(() => {
      this.flippedCards.forEach((card) => card.unflip());
      this.flippedCards = [];
      this.isLocked = false;
      this.currentPlayer = this.currentPlayer === 0 ? 1 : 0;
      this.sendStateUpdate();
    }, 800);
  }

  private handleCardClick(): void {
    this.field.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      const cardElement = target.closest(".card") as HTMLButtonElement | null;

      if (!cardElement || this.isLocked) return;

      const cardId = Number(cardElement.dataset.cardId);
      const card = this.deck.getCards().find((item) => item.id === cardId);

      if (!card) return;
      if (!card.flip()) return;

      this.flippedCards.push(card);

      if (this.flippedCards.length === 2) {
        this.checkMatch();
      }
    });
  }

  private gameOver(): void {
    const allMatched = this.deck.getCards().every((card) => card.matched);

    console.log("gameover");
    if (!allMatched) return;

    const params = new URLSearchParams({
      theme: this.theme,
      playerone: this.players[0].getName(),
      playertwo: this.players[1].getName(),
      scoreone: this.players[0].getScore().toString(),
      scoretwo: this.players[1].getScore().toString(),
    });

    setTimeout(() => {
      window.location.href = `/gameover.html?${params.toString()}`;
    }, 3000);
  }
}
