import { uiIcons } from "../assets/icons";
import { confettiBackgroundTemplate, containerTemplate } from "../templates/winnerOverlay.template";
import { ThemeName } from "../themes";

/**
 * Represents the overlay displayed when a player wins the game.
 */
export class WinnerOverlay {
  private container: HTMLElement;

  /**
   * Initializes a new instance of the WinnerOverlay class.
   */
  constructor() {
    this.container = document.getElementById("winner-overlay")!;
  }

  /**
   * Displays the winner overlay with the appropriate theme and player information.
   * @param playerOne - The name of the first player.
   * @param playerTwo - The name of the second player.
   * @param scoreOne - The final score of the first player.
   * @param scoreTwo - The final score of the second player.
   * @param theme - The current theme of the game.
   */
  public show(playerOne: string, theme: ThemeName): void {
    this.container.innerHTML = containerTemplate(playerOne, uiIcons.chessFigure());

    const elements = this.getElements();
    this.bindBackToMenu(elements.backToMenuButton);
    this.applyPlayerColor(
      playerOne,
      elements.winnerPlayerNameElement,
      elements.winnerPlayerIconElement,
    );
    this.renderTheme(theme, elements);

    this.container.classList.add("show");
  }

  /**
   * Hides the winner overlay.
   */
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

  /**
   * Binds the click event to the "Back to Menu" button, redirecting the user to the settings page.
   * @param button - The "Back to Menu" button element.
   */
  private bindBackToMenu(button: HTMLButtonElement): void {
    button.addEventListener("click", () => {
      window.location.href = "/settings.html";
    });
  }

  /**
   * Applies the appropriate color class to the winner's name and icon based on the player's name.
   * @param playerOne - The name of the first player.
   * @param playerNameElement - The HTML element representing the winner's name.
   * @param playerIconElement - The HTML element representing the winner's icon.
   */
  private applyPlayerColor(
    playerOne: string,
    playerNameElement: HTMLSpanElement,
    playerIconElement: HTMLSpanElement,
  ): void {
    const colorClass = playerOne === "Orange" ? "player-orange" : "player-blue";
    playerNameElement.classList.add(colorClass);
    playerIconElement.classList.add(colorClass);
  }

  /**
   * Renders the winner overlay based on the current theme.
   * @param theme - The current theme of the game.
   * @param elements - An object containing references to the back to menu button, winner player name element, and winner player icon element.
   */
  private renderTheme(
    theme: ThemeName,
    elements: {
      backToMenuButton: HTMLButtonElement;
      winnerPlayerNameElement: HTMLSpanElement;
      winnerPlayerIconElement: HTMLSpanElement;
    },
  ): void {
    if (theme === "code") {
      this.renderCodeTheme(elements);
      return;
    }

    if (theme === "gaming") {
      this.renderGamingTheme(elements);
      return;
    }

    if (theme === "da") {
      this.renderDaTheme(elements);
    }
  }

  /**
   * Renders the winner overlay for the "code" theme, displaying specific icons and text.
   * @param elements - An object containing references to the back to menu button, winner player name element, and winner player icon element.
   */
  private renderCodeTheme(elements: {
    backToMenuButton: HTMLButtonElement;
    winnerPlayerNameElement: HTMLSpanElement;
    winnerPlayerIconElement: HTMLSpanElement;
  }): void {
    const confetti = new URL("../assets/themes/code-vibes/images/confetti.svg", import.meta.url)
      .href;
    const confettiExtra = new URL(
      "../assets/themes/code-vibes/images/confetti-extra.svg",
      import.meta.url,
    ).href;

    const confettiBackground = document.getElementById("confetti-background") as HTMLDivElement;
    confettiBackground.innerHTML = confettiBackgroundTemplate(confetti, confettiExtra);

    this.container.classList.add("winner-overlay--code");
    elements.backToMenuButton.innerText = "Back to start";
  }

  /**
   * Renders the winner overlay for the "gaming" theme, displaying specific icons and text.
   * @param elements - An object containing references to the back to menu button, winner player name element, and winner player icon element.
   */
  private renderGamingTheme(elements: {
    backToMenuButton: HTMLButtonElement;
    winnerPlayerNameElement: HTMLSpanElement;
    winnerPlayerIconElement: HTMLSpanElement;
  }): void {
    const cupIcon = new URL("../assets/themes/gaming/images/cup.svg", import.meta.url).href;

    elements.winnerPlayerIconElement.innerHTML = `
      <img src="${cupIcon}" alt="Cup Icon" class="winner-overlay__icon--cup" />
    `;
  }

  /**
   * Renders the winner overlay for the "da" theme, displaying specific icons and text.
   * @param elements - An object containing references to the back to menu button, winner player name element, and winner player icon element.
   */
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
