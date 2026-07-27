import banana from "../assets/themes/gaming/card-front-icons/banana.png";
import checkered from "../assets/themes/gaming/card-front-icons/checkered-ass.png";
import coin from "../assets/themes/gaming/card-front-icons/coin.png";
import dice from "../assets/themes/gaming/card-front-icons/dice.png";
import gameboy from "../assets/themes/gaming/card-front-icons/gameboy.png";
import gamepad from "../assets/themes/gaming/card-front-icons/gamepad.png";
import labyrinth from "../assets/themes/gaming/card-front-icons/labyrinth.png";
import levelup from "../assets/themes/gaming/card-front-icons/levelup.png";
import minecraft from "../assets/themes/gaming/card-front-icons/minecraft.png";
import pacman from "../assets/themes/gaming/card-front-icons/pacman.png";
import play from "../assets/themes/gaming/card-front-icons/playbutton.png";
import puzzle from "../assets/themes/gaming/card-front-icons/puzzle.png";
import snake from "../assets/themes/gaming/card-front-icons/snake.png";
import circle from "../assets/themes/gaming/card-front-icons/squid-circle.png";
import square from "../assets/themes/gaming/card-front-icons/squid-square.png";
import triangle from "../assets/themes/gaming/card-front-icons/squid-triangle.png";
import toad from "../assets/themes/gaming/card-front-icons/toad.png";

import cardBackImage from "../assets/themes/card-icon-back/da_logo.png";

import { Theme } from "../models/Theme";

export const gamingTheme: Theme = {
  name: "gaming",
  icons: [
    banana,
    checkered,
    coin,
    dice,
    gameboy,
    gamepad,
    labyrinth,
    levelup,
    minecraft,
    pacman,
    play,
    puzzle,
    snake,
    circle,
    square,
    triangle,
    toad,
  ],
  cardBack: cardBackImage,
};
