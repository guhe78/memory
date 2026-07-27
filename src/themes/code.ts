import { Theme } from "../models/Theme";

import cardBackImage from "../assets/themes/card-icon-back/da_logo.png";

import angular from "../assets/themes/code-vibes/card-front-icons/angular.png";
import bootstrap from "../assets/themes/code-vibes/card-front-icons/bootstrap.png";
import css from "../assets/themes/code-vibes/card-front-icons/css.png";
import django from "../assets/themes/code-vibes/card-front-icons/django.png";
import firebase from "../assets/themes/code-vibes/card-front-icons/firebase.png";
import git from "../assets/themes/code-vibes/card-front-icons/git.png";
import github from "../assets/themes/code-vibes/card-front-icons/github.png";
import html from "../assets/themes/code-vibes/card-front-icons/html.png";
import javascript from "../assets/themes/code-vibes/card-front-icons/javascript.png";
import nodejs from "../assets/themes/code-vibes/card-front-icons/nodejs.png";
import python from "../assets/themes/code-vibes/card-front-icons/python.png";
import react from "../assets/themes/code-vibes/card-front-icons/react.png";
import sass from "../assets/themes/code-vibes/card-front-icons/sass.png";
import sql from "../assets/themes/code-vibes/card-front-icons/sql.png";
import terminal from "../assets/themes/code-vibes/card-front-icons/terminal.png";
import typescript from "../assets/themes/code-vibes/card-front-icons/typescript.png";
import vscode from "../assets/themes/code-vibes/card-front-icons/vscode.png";
import vue from "../assets/themes/code-vibes/card-front-icons/vue.png";

export const codeTheme: Theme = {
  name: "code",
  icons: [
    angular,
    bootstrap,
    css,
    django,
    firebase,
    git,
    github,
    html,
    javascript,
    nodejs,
    python,
    react,
    sass,
    sql,
    terminal,
    typescript,
    vscode,
    vue,
  ],
  cardBack: cardBackImage,
};
