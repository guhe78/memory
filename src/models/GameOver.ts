import { gameOverSvg, uiIcons } from "../assets/icons";
import {
  containerTemplate,
  titleMarkupCodeThemeTemplate,
  titleMarkupTemplate,
} from "../templates/gameOver.template";
import { ThemeName } from "../themes";
import { DrawOverlay } from "./DrawOverlay";
import { WinnerOverlay } from "./WinnerOverlay";

export class GameOver {
  private container: HTMLElement;
  private readonly winnerOverlay: WinnerOverlay;
  private readonly drawOverlay: DrawOverlay;

  constructor() {
    this.container = document.getElementById("game-over")!;
    this.winnerOverlay = new WinnerOverlay();
    this.drawOverlay = new DrawOverlay();
  }

  public show(
    playerOne: string,
    playerTwo: string,
    scoreOne: number,
    scoreTwo: number,
    theme: ThemeName,
  ): void {
    const isCodeTheme = theme === "code";
    const svgWord = isCodeTheme ? this.getGameOverSvg() : "Game Over";
    const isBlueFirst = playerOne.toLowerCase() === "blue";
    const playerOneColorClass = isBlueFirst ? "player-blue" : "player-orange";
    const playerTwoColorClass = isBlueFirst ? "player-orange" : "player-blue";
    const playerOneLabel =
      theme === "code" ? `${uiIcons.label()}${playerOne}` : `${uiIcons.chessFigure()}`;
    const playerTwoLabel =
      theme === "code" ? `${uiIcons.label()}${playerTwo}` : `${uiIcons.chessFigure()}`;

    const titleMarkup = isCodeTheme
      ? titleMarkupCodeThemeTemplate(svgWord)
      : titleMarkupTemplate(svgWord);
    this.container.innerHTML = `${titleMarkup} ${containerTemplate(
      playerOneColorClass,
      playerTwoColorClass,
      playerOneLabel,
      playerTwoLabel,
      scoreOne,
      scoreTwo,
    )}`;

    setTimeout(() => {
      this.container.classList.add("show");
    }, 1000);

    setTimeout(() => {
      const winner = this.getWinner(playerOne, playerTwo, scoreOne, scoreTwo);
      if (winner) {
        this.winnerOverlay.show(playerOne, playerTwo, scoreOne, scoreTwo, theme);
        this.container.classList.remove("show");
      } else if (winner === null) {
        this.drawOverlay.show(theme);
        this.container.classList.remove("show");
      }
    }, 3000);
  }

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
