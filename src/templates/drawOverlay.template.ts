export function containerTemplate(): string {
  return `
    <div class="draw-overlay__content">
        <div class="draw-overlay__title-container">
          <p>It's a</p>
          <span id="draw-text-or-icons" class="draw-text-or-icons"></span>
          <div class="scale-container" id="scale-container"></div>
        </div>
        <button class="winner-overlay__content__button" id="back-to-menu-button">Home</button>
      </div>
  `;
}

export function scaleContainerCodeThemeTemplate(drawText: string): string {
  return `
          <div class="draw-overlay__icon--container">
            <span class="draw-overlay__icon draw-overlay__icon--back">${drawText}</span>
            <span class="draw-overlay__icon draw-overlay__icon--front">${drawText}</span>
          </div>
        `;
}

export function scaleContainerTemplate(scaleIcon: string): string {
  return `<div class="scale">${scaleIcon}</div>`;
}
