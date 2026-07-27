import "./styles/game.scss";

import { uiIcons } from "./assets/icons/ui-svg";
import { uiButtonsFoods } from "./assets/icons/ui-foods-svg";
import { Game, Dialog, type GameState } from "./models";
import { ThemeName } from "./themes";

const params = new URLSearchParams(window.location.search);
const theme = (params.get("theme") || "code") as ThemeName;

initGamePage();

function initGamePage() {
  setGameBoard(theme, Number(params.get("size")) ?? 16, params.get("player") ?? "blue");
  initExitDialog();
  setHeaderTheme();
  setExitPopUpButtons();
}

function setGameBoard(theme: ThemeName, cards: number, player: string) {
  const themeClassMap: Record<ThemeName, string> = {
    code: "code-theme",
    da: "da-theme",
    gaming: "gaming-theme",
    foods: "foods-theme",
  };

  document.body.classList.remove("code-theme", "da-theme", "gaming-theme", "foods-theme");
  document.body.classList.add(themeClassMap[theme]);

  const gameBoard = document.getElementById("field") as HTMLDivElement;
  gameBoard.style.setProperty("--columns", cards === 16 ? "4" : "6");
  const firstPlayerName = player === "blue" ? "Blue" : "Orange";
  const secondPlayerName = player === "blue" ? "Orange" : "Blue";

  const game = new Game(
    gameBoard,
    cards,
    theme,
    [firstPlayerName, secondPlayerName],
    updateScoreboard,
  );

  game.start();
}

function updateScoreboard(state: GameState) {
  const playerOneScore = document.getElementById("player-one-score") as HTMLSpanElement;
  const playerTwoScore = document.getElementById("player-two-score") as HTMLSpanElement;

  playerOneScore.innerText = String(state.scores[0]);
  playerTwoScore.innerText = String(state.scores[1]);

  const playerOne = document.getElementById("player-one") as HTMLDivElement;
  const playerTwo = document.getElementById("player-two") as HTMLDivElement;

  playerOne.classList.toggle("is-current", state.currentPlayer === 0);
  playerTwo.classList.toggle("is-current", state.currentPlayer === 1);

  const currentPlayerElement = state.currentPlayer === 0 ? playerOne : playerTwo;
  updateCurrentPlayerColor(currentPlayerElement);
}

function updateCurrentPlayerColor(currentPlayerElement: HTMLDivElement) {
  const currentPlayerColor = document.getElementById("current-player-symbol") as HTMLSpanElement;
  const isBlue = currentPlayerElement.classList.contains("player-blue");

  if (theme === "code") {
    currentPlayerColor.classList.toggle("player-blue", isBlue);
    currentPlayerColor.classList.toggle("player-orange", !isBlue);
  } else {
    currentPlayerColor.classList.toggle("player-blue__background", isBlue);
    currentPlayerColor.classList.toggle("player-orange__background", !isBlue);
  }
}

function initExitDialog() {
  const dialog = new Dialog(document.getElementById("exit-dialog") as HTMLDialogElement);
  const exitButton = document.getElementById("exit-button") as HTMLButtonElement;
  const exitYesButton = document.getElementById("exit-yes");
  const exitNoButton = document.getElementById("exit-no");

  if (params.get("theme") === "foods") {
    exitButton.innerHTML = `<span class="exit-button-foods-border">${uiButtonsFoods.exitButtonHeader()}</span> ${uiIcons.exit()} Exit game`;
  } else {
    exitButton.innerHTML = `${uiIcons.exit()} Exit game`;
  }
  exitButton.addEventListener("click", () => {
    dialog.open();
  });

  exitYesButton?.addEventListener("click", () => {
    window.location.href = "settings.html";
  });

  exitNoButton?.addEventListener("click", () => {
    dialog.close();
  });
}

function setHeaderTheme() {
  const playerOne = document.getElementById("player-one") as HTMLDivElement;
  const playerTwo = document.getElementById("player-two") as HTMLDivElement;
  const playerOneSymbol = document.getElementById("player-one-symbol") as HTMLSpanElement;
  const playerTwoSymbol = document.getElementById("player-two-symbol") as HTMLSpanElement;
  const currentPlayerSymbol = document.getElementById("current-player-symbol") as HTMLSpanElement;

  const theme = params.get("theme");
  const playerColor = params.get("player");
  let playerOneText: string = "Blue";
  let playerTwoText: string = "Orange";

  if (playerColor === "blue") {
    playerOne?.classList.add("player-blue");
    playerTwo?.classList.add("player-orange");
  } else {
    playerOne?.classList.add("player-orange");
    playerTwo?.classList.add("player-blue");
    playerOneText = "Orange";
    playerTwoText = "Blue";
  }

  if (theme === "code") {
    playerOneSymbol.innerHTML = uiIcons.label() + playerOneText;
    playerTwoSymbol.innerHTML = uiIcons.label() + playerTwoText;
    currentPlayerSymbol.innerHTML = uiIcons.label();
  } else {
    playerOneSymbol.innerHTML = uiIcons.chessFigure();
    playerTwoSymbol.innerHTML = uiIcons.chessFigure();
    currentPlayerSymbol.innerHTML = uiIcons.chessFigure();
  }
}

function setExitPopUpButtons() {
  const theme = params.get("theme");
  const yesButton = document.getElementById("exit-yes") as HTMLButtonElement;
  const noButton = document.getElementById("exit-no") as HTMLButtonElement;
  const exitButton = document.getElementById("exit-button") as HTMLButtonElement;

  if (theme === "da" || theme === "code") {
    noButton.innerText = "Back to game";
    yesButton.innerText = "Exit game";
  } else if (theme === "gaming") {
    noButton.innerText = "No, back to game";
    yesButton.innerText = "Yes, quit game";
  } else if (theme === "foods") {
    noButton.innerHTML = `
      <span class="no-button-icon">
        ${uiButtonsFoods.backButtonPopup()}
      </span>No, back to game`;
    yesButton.innerHTML = `
      <span class="yes-button-icon">
        ${uiButtonsFoods.exitButtonPopup()}
      </span>Exit game`;
    noButton.classList.add("extra-font");
    yesButton.classList.add("extra-font");
    exitButton.classList.add("extra-font");
  }
}
