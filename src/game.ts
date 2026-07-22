import "./styles/game.scss";
import * as card from "../src/models/Card";

const params = new URLSearchParams(window.location.search);

setGameBoard(
  params.get("theme") ?? "code",
  Number(params.get("size")) ?? 16,
  params.get("player") ?? "blue",
);

export function setGameBoard(theme: string, cards: number, player: string) {
  const themeClassMap: Record<string, string> = {
    code: "code-theme",
    da: "da-theme",
    gaming: "gaming-theme",
    foods: "foods-theme",
  };

  document.body.classList.remove("code-theme", "da-theme", "gaming-theme", "foods-theme");
  document.body.classList.add(themeClassMap[theme]);

  const gameBoard = document.getElementById("field") as HTMLDivElement;
  gameBoard.style.setProperty("--columns", cards === 16 ? "4" : "6");

  card.initCards(cards);
}

function initExitDialog() {
  const dialog = document.getElementById("exit-dialog") as HTMLDialogElement;
  const exitButton = document.getElementById("exit-button") as HTMLButtonElement;

  exitButton?.addEventListener("click", () => {
    dialog.showModal();
  });
}
