/**
 * Generates the HTML template for the draw overlay container.
 * @returns A string containing the HTML structure for the draw overlay.
 */
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

/**
 * Generates the HTML template for the scale container in the "code" theme.
 * @param drawText - The text to be displayed in the draw overlay.
 * @returns A string containing the HTML structure for the scale container in the "code" theme.
 */
export function scaleContainerCodeThemeTemplate(drawText: string): string {
  return `
          <div class="draw-overlay__icon--container">
            <span class="draw-overlay__icon draw-overlay__icon--back">${drawText}</span>
            <span class="draw-overlay__icon draw-overlay__icon--front">${drawText}</span>
          </div>
        `;
}

/**
 * Generates the HTML template for the scale container in themes other than "code".
 * @param drawIcon - The icon to be displayed in the draw overlay.
 * @returns A string containing the HTML structure for the scale container in themes other than "code".
 */
export function scaleContainerTemplate(scaleIcon: string): string {
  return `<div class="scale">${scaleIcon}</div>`;
}
