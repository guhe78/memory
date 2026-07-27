import { Card } from "./Card";
import { themes, ThemeName } from "../themes";

export class Deck {
  private readonly field: HTMLDivElement;
  private readonly size: number;
  private readonly theme: ThemeName;
  private cards: Card[] = [];

  constructor(field: HTMLDivElement, size: number, theme: ThemeName) {
    this.field = field;
    this.size = size;
    this.theme = theme;
  }

  public create(): void {
    this.cards = this.buildCards();
    this.shuffle();
    this.render();
  }

  public getCards(): Card[] {
    return this.cards;
  }

  public getFlippedCards(): Card[] {
    return this.cards.filter((card) => card.flipped && !card.matched);
  }

  private buildCards(): Card[] {
    const pairCount = this.size / 2;
    const symbols = this.getSymbolsForTheme().slice(0, pairCount);

    const cardSymbols = [...symbols, ...symbols];
    return cardSymbols.map((symbol, index) => new Card(index, symbol));
  }

  private getSymbolsForTheme(): string[] {
    const symbolsByTheme: Record<ThemeName, string[]> = {
      code: themes.code.icons,
      da: themes.da.icons,
      gaming: themes.gaming.icons,
      foods: themes.foods.icons,
    };

    const symbols = symbolsByTheme[this.theme];

    if (this.size / 2 > symbols.length) {
      throw new Error(`Not enough symbols for theme "${this.theme}" and size ${this.size}.`);
    }

    return symbols;
  }

  private shuffle(): void {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  private render(): void {
    this.field.innerHTML = "";

    const fragment = document.createDocumentFragment();
    for (const card of this.cards) {
      fragment.appendChild(card.getElement());
    }

    this.field.appendChild(fragment);
  }
}
