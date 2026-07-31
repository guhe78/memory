import { drawSvg } from "../assets/icons";
import { ThemeName } from "../themes";

import {
  containerTemplate,
  scaleContainerCodeThemeTemplate,
  scaleContainerTemplate,
} from "../templates/drawOverlay.template";

export class DrawOverlay {
  private container: HTMLElement;

  constructor() {
    this.container = document.getElementById("draw-overlay")!;
  }

  public show(theme: ThemeName): void {
    this.container.innerHTML = containerTemplate();

    const elements = this.getElements();
    this.bindBackToMenu(elements.backToMenuButton);
    this.renderTheme(theme, elements);

    this.container.classList.add("show");
  }

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

  private bindBackToMenu(button: HTMLButtonElement): void {
    button.addEventListener("click", () => {
      window.location.href = "/settings.html";
    });
  }

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

  private renderCodeTheme(elements: {
    drawTextOrIconsElement: HTMLSpanElement;
    backToMenuButton: HTMLButtonElement;
    scaleContainer: HTMLDivElement;
  }): void {
    elements.drawTextOrIconsElement.innerHTML = scaleContainerCodeThemeTemplate(drawSvg.white());
    elements.scaleContainer.innerHTML = scaleContainerTemplate(drawSvg.scale());
    elements.backToMenuButton.innerText = "Back to start";
  }

  private getScaleIcon(theme: ThemeName): string {
    return theme === "da" ? drawSvg.scaleOutlineBig() : drawSvg.scale();
  }
}
