import "../styles/components/_card.scss";

/**
 * Represents a card in the memory game.
 */
export class Card {
  public readonly id: number;
  public readonly symbol: string;

  private isFlipped = false;
  private isMatched = false;
  private isLocked = false;

  private readonly element: HTMLButtonElement;
  private readonly frontFace: HTMLDivElement;
  private readonly imageIcon: HTMLImageElement;

  /**   * Initializes a new instance of the Card class.
   * @param id - The unique identifier for the card.
   * @param symbol - The symbol or image associated with the card.
   */
  constructor(id: number, symbol: string) {
    this.id = id;
    this.symbol = symbol;
    this.element = this.createElement();
    this.frontFace = this.element.querySelector(".card__face--front") as HTMLDivElement;
    this.imageIcon = this.element.querySelector(".card-symbol") as HTMLImageElement;
    this.imageIcon.src = symbol;
    this.imageIcon.alt = "";
  }

  /**
   * Creates the HTML element for the card.
   * @returns The HTMLButtonElement representing the card.
   */
  private createElement(): HTMLButtonElement {
    const button = document.createElement("button");
    button.className = "card";
    button.type = "button";
    button.dataset.cardId = String(this.id);
    button.setAttribute("aria-label", "Memory card");
    button.innerHTML = `
      <div class="card__inner">
        <div class="card__face card__face--back"></div>
        <div class="card__face card__face--front"><img class="card-symbol" /></div>
      </div>
    `;
    return button;
  }

  /**
   * Gets the HTML element for the card.
   * @returns The HTMLButtonElement representing the card.
   */
  public getElement(): HTMLButtonElement {
    return this.element;
  }

  /**
   * Proofs whether the card can be flipped based on its current state.
   * @returns True if the card can be flipped, false otherwise.
   */
  public canFlip(): boolean {
    return !this.isFlipped && !this.isMatched && !this.isLocked;
  }

  /**
   * Proofs whether the card is currently flipped.
   * @returns True if the card is flipped, false otherwise.
   */
  public isCurrentlyFlipped(): boolean {
    return this.isFlipped;
  }

  /**
   * Flips the card if it can be flipped.
   * @returns True if the card was successfully flipped, false otherwise.
   */
  public flip(): boolean {
    if (!this.canFlip()) return false;
    this.isFlipped = true;
    this.element.classList.add("is-flipped");
    return true;
  }

  /**
   * Unflips the card if it is not matched.
   * @returns void
   */
  public unflip(): void {
    if (this.isMatched) return;
    this.isFlipped = false;
    this.element.classList.remove("is-flipped");
  }

  /**
   * Marks the card as matched, flips it, and adds the appropriate CSS classes.
   * @returns void
   */
  public match(): void {
    this.isMatched = true;
    this.isFlipped = true;
    this.element.classList.add("is-flipped", "is-matched");
  }

  /**
   * Locks the card, preventing it from being flipped or interacted with.
   * @returns void
   */
  public lock(): void {
    this.isLocked = true;
    this.element.classList.add("is-locked");
  }

  /**
   * Unlocks the card, allowing it to be flipped and interacted with again.
   * @returns void
   */
  public unlock(): void {
    this.isLocked = false;
    this.element.classList.remove("is-locked");
  }

  /**
   * Gets the matched state of the card.
   * @returns True if the card is matched, false otherwise.
   */
  public get matched(): boolean {
    return this.isMatched;
  }

  /**
   * Gets the flipped state of the card.
   * @returns True if the card is flipped, false otherwise.
   */
  public get flipped(): boolean {
    return this.isFlipped;
  }
}
