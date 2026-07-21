import "./styles/settings.scss";
import { uiIcons } from "./assets/icons/ui-svg";

const previewImage = document.getElementById("preview-image") as HTMLImageElement;
const themePreviewBoard = document.getElementById("theme-preview") as HTMLDivElement;
const playerPreviewBoard = document.getElementById("player-preview") as HTMLDivElement;
const sizePreviewBoard = document.getElementById("size-preview") as HTMLDivElement;
const startGameButton = document.getElementById("start-game-button") as HTMLButtonElement;

const boardSeparators = document.querySelectorAll<HTMLDivElement>(".board-seperator");

const previews = {
  code: new URL("./assets/images/design-preview/code-theme.png", import.meta.url).href,
  gaming: new URL("./assets/images/design-preview/gaming-theme.png", import.meta.url).href,
  da: new URL("./assets/images/design-preview/da-theme.png", import.meta.url).href,
  foods: new URL("./assets/images/design-preview/food-theme.png", import.meta.url).href,
} as const;

type ThemeKey = keyof typeof previews;
type GroupName = "theme" | "player" | "size";

const lineChosen = uiIcons.lineChoosen(14);
document.querySelectorAll<HTMLElement>(".label-line").forEach((line) => {
  line.innerHTML = lineChosen;
});

function initSettings() {
  setSelectedThemePreview();
  syncPreviewBoardText();
  addInputListener();
  addSymbols();
}

function getCheckedInput(group: GroupName) {
  return document.querySelector<HTMLInputElement>(`input[name="${group}"]:checked`);
}

function getLabelText(input: HTMLInputElement) {
  const raw = input.labels?.[0]?.childNodes[0]?.textContent ?? input.value;
  return raw.trim();
}

function setThemePreview(theme: ThemeKey) {
  previewImage.src = previews[theme];
}

function setSelectedThemePreview() {
  const checkedTheme = getCheckedInput("theme");
  if (!checkedTheme) return;
  setThemePreview(checkedTheme.value as ThemeKey);
}

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
      ? uiIcons.seperatorChoosen(32)
      : uiIcons.seperatorUnchoosen(32);
  }

  if (boardSeparators[1]) {
    boardSeparators[1].innerHTML = sizeSelected
      ? uiIcons.seperatorChoosen(32)
      : uiIcons.seperatorUnchoosen(32);
  }

  if (playerSelected && sizeSelected) startGameButton.disabled = false;
}

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

function addSymbols() {
  const headlineUnderline = document.getElementById("headline-underline") as HTMLDivElement;
  const gameSubheading = document.getElementById("game-themes-symbol") as HTMLSpanElement;
  const playerSubheading = document.getElementById("choose-player-symbol") as HTMLSpanElement;
  const boardSizeSubheading = document.getElementById("board-size-symbol") as HTMLSpanElement;
  const startGameButton = document.getElementById("start-game-button-text") as HTMLSpanElement;

  headlineUnderline.innerHTML = uiIcons.headlineUnderline(25);
  gameSubheading.innerHTML = uiIcons.palette(20);
  playerSubheading.innerHTML = uiIcons.chessFigure(20);
  boardSizeSubheading.innerHTML = uiIcons.board(20);
  startGameButton.innerHTML = uiIcons.display(20);
}

initSettings();
