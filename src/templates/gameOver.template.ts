export function titleMarkupCodeThemeTemplate(svgWord: string): string {
  return `
        <h1 class="game-over__title game-over__title--code">
          <span class="game-over__title-layer game-over__title-layer--back">
          ${svgWord}
          </span>
          <span class="game-over__title-layer game-over__title-layer--front">
          ${svgWord}
          </span>
        </h1>
      `;
}

export function titleMarkupTemplate(svgWord: string): string {
  return `<h1 class="game-over__title" id="game-over-title">Game Over</h1>`;
}

export function containerTemplate(
  playerOneColorClass: string,
  playerTwoColorClass: string,
  playerOneLabel: string,
  playerTwoLabel: string,
  scoreOne: number,
  scoreTwo: number,
): string {
  return `
    <p>Final score</p>
        <div class="score-board score-board--gameover">
          <div class="player-one player-one--gameover ${playerOneColorClass}" id="player-one-gameover">
            <span id="player-one-symbol-gameover">${playerOneLabel}</span>
            <span class="player-one--score" id="player-one-score-gameover">${scoreOne}</span>
          </div>
          <div class="player-two player-two--gameover ${playerTwoColorClass}" id="player-two-gameover">
            <span id="player-two-symbol-gameover">${playerTwoLabel}</span>
            <span class="player-two--score" id="player-two-score-gameover">${scoreTwo}</span>
          </div>
        </div>
      `;
}
