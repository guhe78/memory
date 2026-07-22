export class Dialog {
  constructor(private element: HTMLElement) {}

  open() {
    this.element.classList.add("open");
  }

  close() {
    this.element.classList.remove("open");
  }
}
