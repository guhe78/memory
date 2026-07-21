import * as card from "../src/models/Card";

setGameBoard("da", 32, "orange");

export function setGameBoard(theme: string, cards: number, player: string) {
  const playerColorStart = player;
  const numberOfCards = cards;
  const gameTheme = theme;

  card.initCards(numberOfCards);
}
