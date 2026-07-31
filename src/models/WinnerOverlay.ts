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
        <div class="winner-overlay__title-container">
          <h1 class="winner-overlay__title">The winner is</h1>
          <span class="winner-overlay__player-name" id="winner-overlay-player-name">${playerOne} Player</span>
        </div>
        <div class="winner-overlay__player" id="winner-overlay-player">
          <span class="winner-overlay__icon" id="winner-overlay-icon">${chessFigureIcon}</span>
        </div>
        <button class="winner-overlay__content__button" id="back-to-menu-button">Home</button>
      </div>
    `;

    const backToMenuButton = document.getElementById("back-to-menu-button") as HTMLButtonElement;
    backToMenuButton.addEventListener("click", () => {
      window.location.href = "/settings.html";
    });
    const winnerPlayerNameElement = document.getElementById(
      "winner-overlay-player-name",
    ) as HTMLSpanElement;
    const winnerPlayerIconElement = document.getElementById(
      "winner-overlay-icon",
    ) as HTMLSpanElement;

    if (playerOne === "Blue") {
      winnerPlayerNameElement.classList.add("player-blue");
      winnerPlayerIconElement.classList.add("player-blue");
    } else if (playerOne === "Orange") {
      winnerPlayerNameElement.classList.add("player-orange");
      winnerPlayerIconElement.classList.add("player-orange");
    }

    switch (true) {
      case isCodeTheme:
        const confettiBackground = document.getElementById("confetti-background") as HTMLDivElement;
        confettiBackground.innerHTML = `
            <picture>
              <source media="(min-width: 1440px)" srcset="${confettiExtra}" />
              <img src="${confetti}" alt="Confetti Background" class="winner-overlay__confetti-image" />
            </picture>
        `;
        this.container.classList.add("winner-overlay--code");
        backToMenuButton.innerText = "Back to start";
        break;
      case isGamingTheme:
        winnerPlayerIconElement.innerHTML = `<img src="${cupIcon}" alt="Cup Icon" class="winner-overlay__icon--cup" />`;
        break;
      case isFoodsTheme:
        break;
      case isDaTheme:
        const chessFigureIconOutline = uiIcons.chessFigureOutlineBig();
        winnerPlayerNameElement.classList.remove("player-blue");
        winnerPlayerNameElement.classList.remove("player-orange");
        winnerPlayerIconElement.innerHTML = `
          <span class="winner-overlay__icon" id="winner-overlay-icon">${chessFigureIconOutline}</span>
        `;
        break;
      default:
    }

    this.container.classList.add("show");
  }
}
