/**
 * Generates the HTML template for the game over title in the "code" theme.
 * @param svgWord - The SVG word to be displayed in the title.
 * @returns A string containing the HTML structure for the game over title in the "code" theme.
 */
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

/**
 * Generates the HTML template for the game over title in themes other than "code".
 * @param svgWord - The SVG word to be displayed in the title.
 * @returns A string containing the HTML structure for the game over title in themes other than "code".
 */
export function titleMarkupTemplate(svgWord: string): string {
  return `<h1 class="game-over__title" id="game-over-title">Game Over</h1>`;
}

/**
 * Generates the HTML template for the game over screen container.
 * @param playerOneColorClass - The CSS class representing the color of the first player.
 * @param playerTwoColorClass - The CSS class representing the color of the second player.
 * @param playerOneLabel - The label or name of the first player.
 * @param playerTwoLabel - The label or name of the second player.
 * @param scoreOne - The final score of the first player.
 * @param scoreTwo - The final score of the second player.
 * @returns A string containing the HTML structure for the game over screen container.
 */
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
