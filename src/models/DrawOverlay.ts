import { drawSvg } from "../assets/icons";
import { ThemeName } from "../themes";

import {
  containerTemplate,
  scaleContainerCodeThemeTemplate,
  scaleContainerTemplate,
} from "../templates/drawOverlay.template";

/**
 * Represents the overlay displayed when the game ends in a draw.
 */
export class DrawOverlay {
  private container: HTMLElement;

  /**
   * Initializes a new instance of the DrawOverlay class.
   */
  constructor() {
    this.container = document.getElementById("draw-overlay")!;
  }

  /**
   * Displays the draw overlay with the appropriate theme.
   * @param theme - The current theme of the game.
   */
  public show(theme: ThemeName): void {
    this.container.innerHTML = containerTemplate();

    const elements = this.getElements();
    this.bindBackToMenu(elements.backToMenuButton);
    this.renderTheme(theme, elements);

    this.container.classList.add("show");
  }

  /**
   * Hides the draw overlay.
   */
  public hide(): void {
    this.container.classList.remove("show");
  }

  /**
   * Retrieves the necessary HTML elements for the draw overlay.
   * @returns An object containing references to the draw text, back to menu button, and scale container elements.
   */
  private getElements(): {
    drawTextOrIconsElement: HTMLSpanElement;
    backToMenuButton: HTMLButtonElement;
    scaleContainer: HTMLDivElement;
  } {
    return {
      drawTextOrIconsElement: document.getElementById("draw-text-or-icons") as HTMLSpanElement,
      backToMenuButton: document.getElementById("back-to-menu-button") as HTMLButtonElement,
      scaleContainer: document.getElementById("scale-container") as HTMLDivElement,
    };
  }

  /**
   * Binds the click event of the back to menu button to navigate to the settings page.
   * @param button - The back to menu button element.
   */
  private bindBackToMenu(button: HTMLButtonElement): void {
    button.addEventListener("click", () => {
      window.location.href = "/settings.html";
    });
  }

  /**
   * Renders the draw overlay based on the current theme.
   * @param theme - The current theme of the game.
   * @param elements - An object containing references to the draw text, back to menu button, and scale container elements.
   */
  private renderTheme(
    theme: ThemeName,
    elements: {
      drawTextOrIconsElement: HTMLSpanElement;
      backToMenuButton: HTMLButtonElement;
      scaleContainer: HTMLDivElement;
    },
  ): void {
    if (theme === "code") {
      this.renderCodeTheme(elements);
      return;
    }

    elements.drawTextOrIconsElement.innerText = "Draw";
    elements.scaleContainer.innerHTML = scaleContainerTemplate(this.getScaleIcon(theme));
  }

  /**
   * Renders the draw overlay for the "code" theme, displaying specific icons and text.
   * @param elements - An object containing references to the draw text, back to menu button, and scale container elements.
   */
  private renderCodeTheme(elements: {
    drawTextOrIconsElement: HTMLSpanElement;
    backToMenuButton: HTMLButtonElement;
    scaleContainer: HTMLDivElement;
  }): void {
    elements.drawTextOrIconsElement.innerHTML = scaleContainerCodeThemeTemplate(drawSvg.white());
    elements.scaleContainer.innerHTML = scaleContainerTemplate(drawSvg.scale());
    elements.backToMenuButton.innerText = "Back to start";
  }

  /**
   * Gets the appropriate scale icon based on the current theme.
   * @param theme - The current theme of the game.
   * @returns The SVG string for the scale icon.
   */
  private getScaleIcon(theme: ThemeName): string {
    return theme === "da" ? drawSvg.scaleOutlineBig() : drawSvg.scale();
  }
}
