import "../styles/components/_card.scss";

export class Card {
  public readonly id: number;
  public readonly symbol: string;

  private isFlipped = false;
  private isMatched = false;
  private isLocked = false;

  private readonly element: HTMLButtonElement;
  private readonly frontFace: HTMLDivElement;
  private readonly imageIcon: HTMLImageElement;

  constructor(id: number, symbol: string) {
    this.id = id;
    this.symbol = symbol;
    this.element = this.createElement();
    this.frontFace = this.element.querySelector(".card__face--front") as HTMLDivElement;
    this.imageIcon = this.element.querySelector(".card-symbol") as HTMLImageElement;
    this.imageIcon.src = symbol;
    this.imageIcon.alt = "";
  }

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

  public getElement(): HTMLButtonElement {
    return this.element;
  }

  public canFlip(): boolean {
    return !this.isFlipped && !this.isMatched && !this.isLocked;
  }

  public flip(): boolean {
    if (!this.canFlip()) return false;
    this.isFlipped = true;
    this.element.classList.add("is-flipped");
    return true;
  }

  public unflip(): void {
    if (this.isMatched) return;
    this.isFlipped = false;
    this.element.classList.remove("is-flipped");
  }

  public match(): void {
    this.isMatched = true;
    this.isFlipped = true;
    this.element.classList.add("is-flipped", "is-matched");
  }

  public lock(): void {
    this.isLocked = true;
    this.element.classList.add("is-locked");
  }

  public unlock(): void {
    this.isLocked = false;
    this.element.classList.remove("is-locked");
  }

  public get matched(): boolean {
    return this.isMatched;
  }

  public get flipped(): boolean {
    return this.isFlipped;
  }
}
