import "./styles/settings.scss";
import { uiIcons } from "./assets/icons/ui-svg";

const previewImage = document.getElementById("preview-image") as HTMLImageElement;
const themePreviewBoard = document.getElementById("theme-preview") as HTMLDivElement;
const playerPreviewBoard = document.getElementById("player-preview") as HTMLDivElement;
const sizePreviewBoard = document.getElementById("size-preview") as HTMLDivElement;
const startGameButton = document.getElementById("start-game-button") as HTMLButtonElement;

const boardSeparators = document.querySelectorAll<HTMLDivElement>(".board-seperator");

const previews = {
  code: new URL("./assets/themes/design-preview/code-theme.png", import.meta.url).href,
  gaming: new URL("./assets/themes/design-preview/gaming-theme.png", import.meta.url).href,
  da: new URL("./assets/themes/design-preview/da-theme.png", import.meta.url).href,
  foods: new URL("./assets/themes/design-preview/food-theme.png", import.meta.url).href,
} as const;

type ThemeKey = keyof typeof previews;
type GroupName = "theme" | "player" | "size";

const lineChosen = uiIcons.lineChoosen(14);
document.querySelectorAll<HTMLElement>(".label-line").forEach((line) => {
  line.innerHTML = lineChosen;
});

/**
 * Initializes the settings page by setting up the theme preview, synchronizing the preview board text, adding input listeners, adding symbols, and setting up the start game button listener.
 */
function initSettings() {
  setSelectedThemePreview();
  syncPreviewBoardText();
  addInputListener();
  addSymbols();
  startGameListener();
}

/**
 * Retrieves the checked input element for a given group name.
 * @param group - The name of the input group (e.g., "theme", "player", "size").
 * @returns The checked HTMLInputElement for the specified group, or null if none is checked.
 */
function getCheckedInput(group: GroupName) {
  return document.querySelector<HTMLInputElement>(`input[name="${group}"]:checked`);
}

/**
 * Retrieves the label text for a given input element, falling back to the input's value if no label is found.
 * @param input - The HTMLInputElement for which to retrieve the label text.
 * @returns The trimmed label text or the input's value if no label is found.
 */
function getLabelText(input: HTMLInputElement) {
  const raw = input.labels?.[0]?.childNodes[0]?.textContent ?? input.value;
  return raw.trim();
}

/**
 * Sets the theme preview image based on the selected theme.
 * @param theme - The key of the selected theme (e.g., "code", "gaming", "da", "foods").
 */
function setThemePreview(theme: ThemeKey) {
  previewImage.src = previews[theme];
}

/**
 * Sets the selected theme preview based on the currently checked theme input.
 */
function setSelectedThemePreview() {
  const checkedTheme = getCheckedInput("theme");
  if (!checkedTheme) return;
  setThemePreview(checkedTheme.value as ThemeKey);
}

/**
 * Synchronizes the preview board text based on the currently selected theme, player, and size inputs.
 */
function syncPreviewBoardText() {
  const themeInput = getCheckedInput("theme");
  const playerInput = getCheckedInput("player");
  const sizeInput = getCheckedInput("size");

  if (themeInput) themePreviewBoard.textContent = getLabelText(themeInput);
  if (playerInput) playerPreviewBoard.textContent = `${getLabelText(playerInput)} Player`;
  if (sizeInput) sizePreviewBoard.textContent = `Board-${getLabelText(sizeInput)}`;

  const playerSelected = Boolean(playerInput);
  const sizeSelected = Boolean(sizeInput);

  if (boardSeparators[0]) {
    boardSeparators[0].innerHTML = playerSelected
      ? uiIcons.seperatorChoosen()
      : uiIcons.seperatorUnchoosen();
  }

  if (boardSeparators[1]) {
    boardSeparators[1].innerHTML = sizeSelected
      ? uiIcons.seperatorChoosen()
      : uiIcons.seperatorUnchoosen();
  }

  if (playerSelected && sizeSelected) startGameButton.disabled = false;
}

/**
 * Adds event listeners to the theme, player, and size input elements to handle hover and change events, updating the preview board accordingly.
 */
function addInputListener() {
  const themeInputs = document.querySelectorAll<HTMLInputElement>('input[name="theme"]');
  themeInputs.forEach((input) => {
    const label = input.labels?.[0];
    if (!label) return;

    label.addEventListener("mouseenter", () => {
      setThemePreview(input.value as ThemeKey);
    });

    label.addEventListener("mouseleave", () => {
      setSelectedThemePreview();
    });

    input.addEventListener("change", () => {
      if (input.checked) {
        setThemePreview(input.value as ThemeKey);
        syncPreviewBoardText();
      }
    });
  });

  document
    .querySelectorAll<HTMLInputElement>('input[name="player"], input[name="size"]')
    .forEach((input) => {
      input.addEventListener("change", syncPreviewBoardText);
    });
}

/**
 * Sets up the event listener for the "Start Game" button, redirecting to the game page with the selected theme, player, and size parameters.
 */
function startGameListener() {
  startGameButton.addEventListener("click", () => {
    const theme = getCheckedInput("theme")?.value ?? "code";
    const player = getCheckedInput("player")?.value ?? "blue";
    const size = getCheckedInput("size")?.value ?? "16";

    window.location.href = "/game.html?theme=" + theme + "&player=" + player + "&size=" + size;
  });
}

/**
 * Adds symbols to the settings page, updating the inner HTML of various elements with corresponding icons for the headline underline, game subheading, player subheading, board size subheading, and start game button.
 */
function addSymbols() {
  const headlineUnderline = document.getElementById("headline-underline") as HTMLDivElement;
  const gameSubheading = document.getElementById("game-themes-symbol") as HTMLSpanElement;
  const playerSubheading = document.getElementById("choose-player-symbol") as HTMLSpanElement;
  const boardSizeSubheading = document.getElementById("board-size-symbol") as HTMLSpanElement;
  const startGameButton = document.getElementById("start-game-button-text") as HTMLSpanElement;

  headlineUnderline.innerHTML = uiIcons.headlineUnderline();
  gameSubheading.innerHTML = uiIcons.palette(20);
  playerSubheading.innerHTML = uiIcons.chessFigure();
  boardSizeSubheading.innerHTML = uiIcons.board(20);
  startGameButton.innerHTML = uiIcons.display(20);
}

initSettings();
