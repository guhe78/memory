export class Dialog {
  constructor(private element: HTMLDialogElement) {}

  open() {
    this.element.showModal();
    this.element.classList.add("open");
  }

  close() {
    this.element.close();
    this.element.classList.remove("open");
  }
}
