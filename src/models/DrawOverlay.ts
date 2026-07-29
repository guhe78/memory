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
        <p>It's a</p>
        <span id="draw-text-or-icons" class="draw-text-or-icons"></span>
        <div class="scale-container"></div>
      </div>
    `;

    this.container.classList.add("show");
  }
}
