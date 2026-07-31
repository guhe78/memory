import { gameOverSvg, uiIcons } from "../assets/icons";
import { confettiBackgroundTemplate, containerTemplate } from "../templates/winnerOverlay.template";
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
    const confetti = new URL("../assets/themes/code-vibes/images/confetti.svg", import.meta.url)
      .href;
    const confettiExtra = new URL(
      "../assets/themes/code-vibes/images/confetti-extra.svg",
      import.meta.url,
    ).href;
    const chessFigureIcon = uiIcons.chessFigure();
    const cupIcon = new URL("../assets/themes/gaming/images/cup.svg", import.meta.url).href;

    this.container.innerHTML = containerTemplate(playerOne, chessFigureIcon);

    const elements = this.getElements();
    this.bindBackToMenu(elements.backToMenuButton);
    this.applyPlayerColor(
      playerOne,
      elements.winnerPlayerNameElement,
      elements.winnerPlayerIconElement,
    );
    this.renderTheme(theme, elements, { confetti, confettiExtra, cupIcon });

    this.container.classList.add("show");
  }

  private getElements(): {
    backToMenuButton: HTMLButtonElement;
    winnerPlayerNameElement: HTMLSpanElement;
    winnerPlayerIconElement: HTMLSpanElement;
  } {
    return {
      backToMenuButton: document.getElementById("back-to-menu-button") as HTMLButtonElement,
      winnerPlayerNameElement: document.getElementById(
        "winner-overlay-player-name",
      ) as HTMLSpanElement,
      winnerPlayerIconElement: document.getElementById("winner-overlay-icon") as HTMLSpanElement,
    };
  }

  private bindBackToMenu(button: HTMLButtonElement): void {
    button.addEventListener("click", () => {
      window.location.href = "/settings.html";
    });
  }

  private applyPlayerColor(
    playerOne: string,
    playerNameElement: HTMLSpanElement,
    playerIconElement: HTMLSpanElement,
  ): void {
    const colorClass = playerOne === "Orange" ? "player-orange" : "player-blue";

    playerNameElement.classList.add(colorClass);
    playerIconElement.classList.add(colorClass);
  }

  private renderTheme(
    theme: ThemeName,
    elements: {
      backToMenuButton: HTMLButtonElement;
      winnerPlayerNameElement: HTMLSpanElement;
      winnerPlayerIconElement: HTMLSpanElement;
    },
    assets: {
      confetti: string;
      confettiExtra: string;
      cupIcon: string;
    },
  ): void {
    if (theme === "code") {
      this.renderCodeTheme(elements, assets);
      return;
    }

    if (theme === "gaming") {
      elements.winnerPlayerIconElement.innerHTML = `<img src="${assets.cupIcon}" alt="Cup Icon" class="winner-overlay__icon--cup" />`;
      return;
    }

    if (theme === "da") {
      this.renderDaTheme(elements);
    }
  }

  private renderCodeTheme(
    elements: {
      backToMenuButton: HTMLButtonElement;
      winnerPlayerNameElement: HTMLSpanElement;
      winnerPlayerIconElement: HTMLSpanElement;
    },
    assets: {
      confetti: string;
      confettiExtra: string;
      cupIcon: string;
    },
  ): void {
    const confettiBackground = document.getElementById("confetti-background") as HTMLDivElement;
    confettiBackground.innerHTML = confettiBackgroundTemplate(
      assets.confetti,
      assets.confettiExtra,
    );

    this.container.classList.add("winner-overlay--code");
    elements.backToMenuButton.innerText = "Back to start";
  }

  private renderDaTheme(elements: {
    backToMenuButton: HTMLButtonElement;
    winnerPlayerNameElement: HTMLSpanElement;
    winnerPlayerIconElement: HTMLSpanElement;
  }): void {
    const chessFigureIconOutline = uiIcons.chessFigureOutlineBig();

    elements.winnerPlayerNameElement.classList.remove("player-blue", "player-orange");
    elements.winnerPlayerIconElement.innerHTML = `
      <span class="winner-overlay__icon" id="winner-overlay-icon">${chessFigureIconOutline}</span>
    `;
  }
}
