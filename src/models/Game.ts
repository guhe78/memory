import { Card } from "./Card";
import { Deck } from "./Deck";
import { ThemeName } from "../themes";
import { Player } from "./Player";

export class Game {
  private readonly deck: Deck;
  private readonly field: HTMLDivElement;
  private flippedCards: Card[] = [];
  private isLocked = false;
  private players: Player[];
  private currentPlayer = 0;

  constructor(field: HTMLDivElement, size: number, theme: ThemeName) {
    this.field = field;
    this.deck = new Deck(field, size, theme);
    this.players = [new Player("Blue"), new Player("Red")];
  }

  public start(): void {
    this.deck.create();
    this.handleCardClick();
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

  private checkMatch(): void {
    const [firstCard, secondCard] = this.flippedCards;

    if (firstCard.symbol === secondCard.symbol) {
      firstCard.match();
      secondCard.match();
      this.players[this.currentPlayer].addPoint();
      this.flippedCards = [];
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
    }, 800);
  }

  private gameOver(): void {
    const allMatched = this.deck.getCards().every((card) => card.matched);

    if (!allMatched) return;

    console.log("gameover");
  }
}
