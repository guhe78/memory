import { gameOverSvg, uiIcons } from "../assets/icons";
import { ThemeName } from "../themes";

export class WinnerOverlay {
  private container: HTMLElement;

  constructor() {
    this.container = document.getElementById("winner-overlay")!;
  }

  public show(
    playerOne: string,
    playerTwo: string,
    scoreOne: number,
    scoreTwo: number,
    theme: ThemeName,
  ): void {
    const isCodeTheme = theme === "code";
    const isGamingTheme = theme === "gaming";
    const isFoodsTheme = theme === "foods";
    const isDaTheme = theme === "da";

    const confetti = new URL("../assets/themes/code-vibes/images/confetti.svg", import.meta.url)
      .href;
    const confettiExtra = new URL(
      "../assets/themes/code-vibes/images/confetti-extra.svg",
      import.meta.url,
    ).href;
    const chessFigureIcon = uiIcons.chessFigure();
    const cupIcon = new URL("../assets/themes/gaming/images/cup.svg", import.meta.url).href;

    this.container.innerHTML = `
      <div id="confetti-background" class="winner-overlay__confetti-background"></div>
      <div class="winner-overlay__content" id="winner-overlay-content">
        <h1 class="winner-overlay__title">The winner is</h1>
            <span class="winner-overlay__player-name">${playerOne} Player</span>
            <span class="winner-overlay__icon" id="winner-overlay-icon"></span>
        <button class="winner-overlay__content__button" id="back-to-menu-button">Back to start</button>
      </div>
    `;

    const backToMenuButton = document.getElementById("back-to-menu-button") as HTMLButtonElement;
    backToMenuButton.addEventListener("click", () => {
      window.location.href = "/settings.html";
    });

    if (playerOne === "Blue") {
      this.container.querySelector("#winner-overlay-player")?.classList.add("player-blue");
    } else if (playerOne === "Orange") {
      this.container.querySelector("#winner-overlay-player")?.classList.add("player-orange");
    }

    if (theme === "gaming") {
      const iconElement = this.container.querySelector("#winner-overlay-icon");
      if (iconElement) {
        iconElement.innerHTML = `<img src="${cupIcon}" alt="Cup Icon" class="winner-overlay__cup-icon" />`;
      }
    } else {
      const iconElement = this.container.querySelector("#winner-overlay-icon");
      if (iconElement) {
        iconElement.innerHTML = chessFigureIcon;
      }
    }

    switch (true) {
      case isCodeTheme:
        const content = this.container.querySelector("#winner-overlay-content") as HTMLDivElement;

        console.log("Code theme detected, adding confetti background");
        const confettiBackground = document.createElement("div");
        confettiBackground.innerHTML = `
          <div class="winner-overlay__content--confetti" id="winner-overlay-confetti">
            <picture>
              <source media="(min-width: 1440px)" srcset="${confettiExtra}" />
              <img src="${confetti}" alt="Confetti Background" class="winner-overlay__confetti-image" />
            </picture>
          </div>
        `;
        content.prepend(confettiBackground);
        break;
      case isGamingTheme:
        break;
      case isFoodsTheme:
        break;
      case isDaTheme:
        break;
      default:
    }

    this.container.classList.add("show");
  }
}
