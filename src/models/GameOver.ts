import { gameOverSvg, uiIcons } from "../assets/icons";
import {
  containerTemplate,
  titleMarkupCodeThemeTemplate,
  titleMarkupTemplate,
} from "../templates/gameOver.template";
import { ThemeName } from "../themes";
import { DrawOverlay } from "./DrawOverlay";
import { WinnerOverlay } from "./WinnerOverlay";

/**
 * Represents the game over screen, displaying the final scores and player names.
 */
export class GameOver {
  private container: HTMLElement;
  private readonly winnerOverlay: WinnerOverlay;
  private readonly drawOverlay: DrawOverlay;

  /**   * Initializes a new instance of the GameOver class.
   */
  constructor() {
    this.container = document.getElementById("game-over")!;
    this.winnerOverlay = new WinnerOverlay();
    this.drawOverlay = new DrawOverlay();
  }

  /**
   * Displays the game over screen with the final scores and player names.
   * @param playerOne - The name of the first player.
   * @param playerTwo - The name of the second player.
   * @param scoreOne - The final score of the first player.
   * @param scoreTwo - The final score of the second player.
   * @param theme - The current theme of the game.
   */
  public show(
    playerOne: string,
    playerTwo: string,
    scoreOne: number,
    scoreTwo: number,
    theme: ThemeName,
  ): void {
    this.renderScreen(playerOne, playerTwo, scoreOne, scoreTwo, theme);
    this.showAfterDelay();
    this.showResultAfterDelay(playerOne, playerTwo, scoreOne, scoreTwo, theme);
  }

  /**
   * Renders the game over screen with the appropriate theme and player information.
   * @param playerOne - The name of the first player.
   * @param playerTwo - The name of the second player.
   * @param scoreOne - The final score of the first player.
   * @param scoreTwo - The final score of the second player.
   * @param theme - The current theme of the game.
   */
  private renderScreen(
    playerOne: string,
    playerTwo: string,
    scoreOne: number,
    scoreTwo: number,
    theme: ThemeName,
  ): void {
    const isCodeTheme = theme === "code";
    const svgWord = isCodeTheme ? this.getGameOverSvg() : "Game Over";
    const titleMarkup = isCodeTheme
      ? titleMarkupCodeThemeTemplate(svgWord)
      : titleMarkupTemplate(svgWord);

    const { playerOneColorClass, playerTwoColorClass } = this.getPlayerClasses(playerOne);
    const { playerOneLabel, playerTwoLabel } = this.getPlayerLabels(playerOne, playerTwo, theme);

    this.container.innerHTML = `${titleMarkup} ${containerTemplate(
      playerOneColorClass,
      playerTwoColorClass,
      playerOneLabel,
      playerTwoLabel,
      scoreOne,
      scoreTwo,
    )}`;
  }

  /**
   * Shows the game over screen after a short delay to allow for any animations or transitions.
   */
  private showAfterDelay(): void {
    setTimeout(() => {
      this.container.classList.add("show");
    }, 1000);
  }

  /**
   * Determines the winner or if it's a draw and shows the appropriate overlay after a delay.
   * @param playerOne - The name of the first player.
   * @param playerTwo - The name of the second player.
   * @param scoreOne - The final score of the first player.
   * @param scoreTwo - The final score of the second player.
   * @param theme - The current theme of the game.
   */
  private showResultAfterDelay(
    playerOne: string,
    playerTwo: string,
    scoreOne: number,
    scoreTwo: number,
    theme: ThemeName,
  ): void {
    setTimeout(() => {
      const winner = this.getWinner(playerOne, playerTwo, scoreOne, scoreTwo);

      if (winner) {
        this.winnerOverlay.show(winner, theme);
        this.hideAfterOverlayShown("winner-overlay");
        return;
      }

      this.drawOverlay.show(theme);
      this.hideAfterOverlayShown("draw-overlay");
    }, 3000);
  }

  /**
   * Hides the game over screen after the overlay has been shown and any transitions have completed.
   * @param overlayId - The ID of the overlay that was shown ("winner-overlay" or "draw-overlay").
   */
  private hideAfterOverlayShown(overlayId: "winner-overlay" | "draw-overlay"): void {
    const overlay = document.getElementById(overlayId);

    if (!overlay) {
      this.container.classList.remove("show");
      return;
    }

    let handled = false;
    const done = () => {
      if (handled) return;
      handled = true;
      this.container.classList.remove("show");
    };

    const onTransitionEnd = (event: TransitionEvent) => {
      if (event.target !== overlay) return;
      done();
    };

    overlay.addEventListener("transitionend", onTransitionEnd, { once: true });

    window.setTimeout(() => {
      overlay.removeEventListener("transitionend", onTransitionEnd);
      done();
    }, 800);
  }

  /**
   * Determines the winner based on the scores of the players.
   * @param playerOne - The name of the first player.
   * @param playerTwo - The name of the second player.
   * @param scoreOne - The final score of the first player.
   * @param scoreTwo - The final score of the second player.
   * @returns The name of the winning player, or null if it's a draw.
   */
  private getPlayerClasses(playerOne: string): {
    playerOneColorClass: string;
    playerTwoColorClass: string;
  } {
    const isBlueFirst = playerOne.toLowerCase() === "blue";

    return {
      playerOneColorClass: isBlueFirst ? "player-blue" : "player-orange",
      playerTwoColorClass: isBlueFirst ? "player-orange" : "player-blue",
    };
  }

  /**
   * Determines the labels for the players based on the theme.
   * @param playerOne - The name of the first player.
   * @param playerTwo - The name of the second player.
   * @param theme - The current theme of the game.
   * @returns An object containing the labels for both players.
   */
  private getPlayerLabels(
    playerOne: string,
    playerTwo: string,
    theme: ThemeName,
  ): {
    playerOneLabel: string;
    playerTwoLabel: string;
  } {
    return {
      playerOneLabel:
        theme === "code" ? `${uiIcons.label()}${playerOne}` : `${uiIcons.chessFigure()}`,
      playerTwoLabel:
        theme === "code" ? `${uiIcons.label()}${playerTwo}` : `${uiIcons.chessFigure()}`,
    };
  }

  /**   * Determines the winner based on the scores of the players.
   * @param playerOne - The name of the first player.
   * @param playerTwo - The name of the second player.
   * @param scoreOne - The final score of the first player.
   * @param scoreTwo - The final score of the second player.
   * @returns The name of the winning player, or null if it's a draw.
   */
  private getWinner(
    playerOne: string,
    playerTwo: string,
    scoreOne: number,
    scoreTwo: number,
  ): string | null {
    if (scoreOne > scoreTwo) return playerOne;
    if (scoreTwo > scoreOne) return playerTwo;

    return null;
  }

  /**   * Generates the SVG representation of the "Game Over" text for the "code" theme.
   * @returns The SVG string for the "Game Over" text.
   */
  private getGameOverSvg(): string {
    return (
      gameOverSvg.g() +
      gameOverSvg.a() +
      gameOverSvg.m() +
      gameOverSvg.e() +
      "&nbsp;" +
      gameOverSvg.o() +
      gameOverSvg.v() +
      gameOverSvg.e() +
      gameOverSvg.r()
    );
  }
}
