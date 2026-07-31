import { Card } from "./Card";
import { themes, ThemeName } from "../themes";

/**
 * Represents a deck of cards in the memory game.
 */
export class Deck {
  private readonly field: HTMLDivElement;
  private readonly size: number;
  private readonly theme: ThemeName;
  private cards: Card[] = [];

  /**
   * Initializes a new instance of the Deck class.
   * @param field - The HTMLDivElement where the deck will be rendered.
   * @param size - The number of cards in the deck (must be even).
   * @param theme - The theme of the game, determining the card symbols.
   */
  constructor(field: HTMLDivElement, size: number, theme: ThemeName) {
    this.field = field;
    this.size = size;
    this.theme = theme;
  }

  /**
   * Creates the deck of cards, shuffles them, and renders them in the field.
   * @returns void
   */
  public create(): void {
    this.cards = this.buildCards();
    this.shuffle();
    this.render();
  }

  /**
   * Gets the array of cards in the deck.
   * @returns An array of Card instances.
   */
  public getCards(): Card[] {
    return this.cards;
  }

  /**
   * Gets the array of currently flipped cards that are not matched.
   * @returns An array of Card instances that are flipped and not matched.
   */
  public getFlippedCards(): Card[] {
    return this.cards.filter((card) => card.flipped && !card.matched);
  }

  /**
   * Builds the deck of cards based on the specified size and theme.
   * @returns An array of Card instances.
   */
  private buildCards(): Card[] {
    const pairCount = this.size / 2;
    const symbols = this.getSymbolsForTheme().slice(0, pairCount);

    const cardSymbols = [...symbols, ...symbols];
    return cardSymbols.map((symbol, index) => new Card(index, symbol));
  }

  /**
   * Gets the symbols for the specified theme.
   * @returns An array of symbols for the theme.
   * @throws Error if there are not enough symbols for the specified size and theme.
   */
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

  /**
   * Shuffles the cards in the deck using the Fisher-Yates algorithm.
   * @returns void
   */
  private shuffle(): void {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  /**
   * Renders the cards in the field by clearing the field and appending the card elements.
   * @returns void
   */
  private render(): void {
    this.field.innerHTML = "";

    const fragment = document.createDocumentFragment();
    for (const card of this.cards) {
      fragment.appendChild(card.getElement());
    }

    this.field.appendChild(fragment);
  }
}
