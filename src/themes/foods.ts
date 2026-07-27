import { Theme } from "../models/Theme";

import cardBackImage from "../assets/themes/card-icon-back/da_logo.png";

import brezn from "../assets/themes/foods/card-front-icons/brezn.png";
import burger from "../assets/themes/foods/card-front-icons/burger.png";
import cake from "../assets/themes/foods/card-front-icons/cake.png";
import chicken from "../assets/themes/foods/card-front-icons/chicken.png";
import chocolate from "../assets/themes/foods/card-front-icons/chocolate.png";
import cupcake from "../assets/themes/foods/card-front-icons/cupcake.png";
import donut from "../assets/themes/foods/card-front-icons/donut.png";
import eclairs from "../assets/themes/foods/card-front-icons/eclairs.png";
import fries from "../assets/themes/foods/card-front-icons/fries.png";
import ice from "../assets/themes/foods/card-front-icons/ice.png";
import jelly from "../assets/themes/foods/card-front-icons/jelly.png";
import pizza from "../assets/themes/foods/card-front-icons/pizza.png";
import salad from "../assets/themes/foods/card-front-icons/salad.png";
import sandwich from "../assets/themes/foods/card-front-icons/sandwich.png";
import sushi from "../assets/themes/foods/card-front-icons/sushi.png";
import taco from "../assets/themes/foods/card-front-icons/taco.png";
import wiener from "../assets/themes/foods/card-front-icons/wiener.png";
import wrap from "../assets/themes/foods/card-front-icons/wrap.png";

export const foodsTheme: Theme = {
  name: "foods",
  icons: [
    brezn,
    burger,
    cake,
    chicken,
    chocolate,
    cupcake,
    donut,
    eclairs,
    fries,
    ice,
    jelly,
    pizza,
    salad,
    sandwich,
    sushi,
    taco,
    wiener,
    wrap,
  ],
  cardBack: cardBackImage,
};
