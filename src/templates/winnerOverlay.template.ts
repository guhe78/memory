/**
 * Generates the HTML markup for the winner overlay container.
 * @param playerOne - The name of the winning player.
 * @param chessFigureIcon - The SVG icon representing the winning player's chess figure.
 * @returns A string containing the HTML markup for the winner overlay container.
 */
export function containerTemplate(playerOne: string, chessFigureIcon: string): string {
  return `
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
}

/**
 * Generates the HTML markup for the confetti background in the winner overlay.
 * @param confetti - The URL of the primary confetti image.
 * @param confettiExtra - The URL of the extra confetti image for larger screens.
 * @returns A string containing the HTML markup for the confetti background.
 */
export function confettiBackgroundTemplate(confetti: string, confettiExtra: string): string {
  return `
            <picture>
              <source media="(min-width: 1440px)" srcset="${confettiExtra}" />
              <img src="${confetti}" alt="Confetti Background" class="winner-overlay__confetti-image" />
            </picture>
        `;
}
