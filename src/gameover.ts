import "./styles/gameover.scss";
import { ThemeName } from "./themes";

const params = new URLSearchParams(window.location.search);
const theme = (params.get("theme") || "code") as ThemeName;
const playerOne = params.get("playerone") || "blue";
const playerTwo = params.get("playertwo") || "orange";
const scoreOne = params.get("scoreone") || "0";
const scoreTwo = params.get("scoretwo") || "0";

initGameoverPage();

function initGameoverPage() {
  renderScoreTable();
}

function renderScoreTable() {
  const playerOneName = document.getElementById("player-one-symbol") as HTMLSpanElement;
  const playerTwoName = document.getElementById("player-two-symbol") as HTMLSpanElement;
  const playerOneScore = document.getElementById("player-one-score") as HTMLSpanElement;
  const playerTwoScore = document.getElementById("player-two-score") as HTMLSpanElement;

  console.log(theme);

  playerOneName.innerText = playerOne;
  playerTwoName.innerText = playerTwo;
  playerOneScore.innerText = scoreOne;
  playerTwoScore.innerText = scoreTwo;
}
