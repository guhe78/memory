/**
 * Represents a dialog in the memory game.
 */
export class Dialog {
  constructor(private element: HTMLDialogElement) {}

  /**
   * Opens the dialog and adds the "open" class for styling.
   */
  open() {
    this.element.showModal();
    this.element.classList.add("open");
  }

  /**
   * Closes the dialog and removes the "open" class for styling.
   */
  close() {
    this.element.close();
    this.element.classList.remove("open");
  }
}
