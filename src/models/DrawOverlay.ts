import { drawSvg } from "../assets/icons";
import { ThemeName } from "../themes";

export class DrawOverlay {
  private container: HTMLElement;

  constructor() {
    this.container = document.getElementById("draw-overlay")!;
  }

  public show(theme: ThemeName): void {
    const isCodeTheme = theme === "code";
    const isGamingTheme = theme === "gaming";
    const isFoodsTheme = theme === "foods";
    const isDaTheme = theme === "da";

    this.container.innerHTML = `
      <div class="draw-overlay__content">
        <div class="draw-overlay__title-container">
          <p>It's a</p>
          <span id="draw-text-or-icons" class="draw-text-or-icons"></span>
          <div class="scale-container" id="scale-container"></div>
        </div>
        <button class="winner-overlay__content__button" id="back-to-menu-button">Home</button>
      </div>
    `;

    const drawTextOrIconsElement = document.getElementById("draw-text-or-icons") as HTMLSpanElement;
    const backToMenuButton = document.getElementById("back-to-menu-button") as HTMLButtonElement;
    backToMenuButton.addEventListener("click", () => {
      window.location.href = "/settings.html";
    });
    const scaleContainer = document.getElementById("scale-container") as HTMLDivElement;

    if (isCodeTheme) {
      drawTextOrIconsElement.innerHTML = `
        <div class="draw-overlay__icon--container">
          <span class="draw-overlay__icon draw-overlay__icon--back">${drawSvg.white()}</span>
          <span class="draw-overlay__icon draw-overlay__icon--front">${drawSvg.white()}</span>
        </div>
      `;
      scaleContainer.innerHTML = `<div class="scale">${drawSvg.scale()}</div>`;
      backToMenuButton.innerText = "Back to start";
    } else if (isGamingTheme) {
      drawTextOrIconsElement.innerText = "Draw";
      scaleContainer.innerHTML = `<div class="scale">${drawSvg.scale()}</div>`;
    } else if (isFoodsTheme) {
      drawTextOrIconsElement.innerText = "Draw";
      scaleContainer.innerHTML = `<div class="scale">${drawSvg.scale()}</div>`;
    } else if (isDaTheme) {
      drawTextOrIconsElement.innerText = "Draw";
      scaleContainer.innerHTML = `<div class="scale">${drawSvg.scaleOutlineBig()}</div>`;
    }

    this.container.classList.add("show");
  }
}
