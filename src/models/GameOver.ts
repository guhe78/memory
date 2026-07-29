import { gameOverSvg, uiIcons } from "../assets/icons";
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
      theme === "code" ? `${uiIcons.label()}${playerOne}` : `${uiIcons.chessFigure()} ${playerOne}`;
    const playerTwoLabel =
      theme === "code" ? `${uiIcons.label()}${playerTwo}` : `${uiIcons.chessFigure()} ${playerTwo}`;

    const titleMarkup = isCodeTheme
      ? `
        <h1 class="game-over__title game-over__title--code">
          <span class="game-over__title-layer game-over__title-layer--back">
          ${svgWord}
          </span>
          <span class="game-over__title-layer game-over__title-layer--front">
          ${svgWord}
          </span>
        </h1>
      `
      : `
        <h1 class="game-over__title" id="game-over-title">Game Over</h1>
      `;
    this.container.innerHTML = `
        ${titleMarkup}
        <div class="score-board score-board-gameover">
          <div class="player-one ${playerOneColorClass}" id="player-one-gameover">
          <span id="player-one-symbol-gameover">${playerOneLabel}</span>
            <span id="player-one-score-gameover">${scoreOne}</span>
          </div>
          <div class="player-two ${playerTwoColorClass}" id="player-two-gameover">
            <span id="player-two-symbol-gameover">${playerTwoLabel}</span>
            <span id="player-two-score-gameover">${scoreTwo}</span>
          </div>
        </div>
      `;

    setTimeout(() => {
      this.container.classList.add("show");
    }, 1000);

    setTimeout(() => {
      const winner = this.getWinner(playerOne, playerTwo, scoreOne, scoreTwo);
      if (winner) {
        this.winnerOverlay.show(playerOne, playerTwo, scoreOne, scoreTwo, theme);
        this.container.classList.remove("show");
      } else {
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
