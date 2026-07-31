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

export function confettiBackgroundTemplate(confetti: string, confettiExtra: string): string {
  return `
            <picture>
              <source media="(min-width: 1440px)" srcset="${confettiExtra}" />
              <img src="${confetti}" alt="Confetti Background" class="winner-overlay__confetti-image" />
            </picture>
        `;
}
