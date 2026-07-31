import { uiIcons } from "../assets/icons/ui-svg";

/**
 * Initializes the home page by setting up the start button.
 */
export function startButton() {
  const startBtn = document.getElementById("start-button");

  if (startBtn) {
    startBtn.innerHTML =
      `<span class="controller-icon">${uiIcons.controller()}</span>` +
      "<p>Play</p>" +
      `<span class="arrow-icon">${uiIcons.arrowRight()}</span><span class="arrow-icon-hover">${uiIcons.arrowRightHover()}</span>`;
    startBtn.addEventListener("click", function () {
      window.location.href = "/settings.html";
    });
  }
}
