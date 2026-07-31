import "./styles/gameover.scss";
import { gameOverSvg, uiIcons } from "./assets/icons";
import { ThemeName } from "./themes";

const params = new URLSearchParams(window.location.search);
const theme = (params.get("theme") || "code") as ThemeName;
const playerOne = params.get("playerone") || "blue";
const playerTwo = params.get("playertwo") || "orange";
const scoreOne = params.get("scoreone") || "0";
const scoreTwo = params.get("scoretwo") || "0";

initGameoverPage();

/**
 * Initializes the game over page by setting the page style and rendering the score table.
 */
function initGameoverPage() {
  initPageStyle();
  renderScoreTable();
}

/**
 * Initializes the page style based on the current theme, applying the appropriate CSS classes to the body element.
 */
function initPageStyle() {
  const themeClassMap: Record<ThemeName, string> = {
    code: "code-theme",
    da: "da-theme",
    gaming: "gaming-theme",
    foods: "foods-theme",
  };

  document.body.classList.remove("code-theme", "da-theme", "gaming-theme", "foods-theme");
  document.body.classList.add(themeClassMap[theme]);
}

/**
 * Renders the score table on the game over page, displaying player names, scores, and applying theme-specific styles and icons.
 */
function renderScoreTable() {
  const gameOverTitle = document.getElementById("game-over-title") as HTMLHeadingElement;
  const playerOneName = document.getElementById("player-one-symbol-gameover") as HTMLSpanElement;
  const playerTwoName = document.getElementById("player-two-symbol-gameover") as HTMLSpanElement;
  const playerOneScore = document.getElementById("player-one-score-gameover") as HTMLSpanElement;
  const playerTwoScore = document.getElementById("player-two-score-gameover") as HTMLSpanElement;

  console.log(theme);

  if (theme === "code") {
    gameOverTitle.innerHTML =
      gameOverSvg.g() +
      gameOverSvg.a() +
      gameOverSvg.m() +
      gameOverSvg.e() +
      gameOverSvg.o() +
      gameOverSvg.v() +
      gameOverSvg.e() +
      gameOverSvg.r();
    playerOneName.innerText = uiIcons.label() + playerOne;
    playerTwoName.innerText = uiIcons.label() + playerTwo;
    if (playerOne.toLowerCase() === "blue") {
      playerOneName.classList.add("player-blue");
      playerTwoName.classList.add("player-orange");
    } else {
      playerOneName.classList.add("player-orange");
      playerTwoName.classList.add("player-blue");
    }
  } else {
    gameOverTitle.innerText = "Gameover";
  }

  playerOneName.innerText = playerOne;
  playerTwoName.innerText = playerTwo;
  playerOneScore.innerText = scoreOne;
  playerTwoScore.innerText = scoreTwo;
}
