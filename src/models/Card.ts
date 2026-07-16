function init() {
  const fieldRef = document.getElementById("field");
  if (fieldRef) {
    fieldRef.addEventListener("click", (e) => {
      const card = (e.target as HTMLElement).closest(".card") as HTMLButtonElement;
      if (card) {
        card.classList.toggle("is-flipped");
        console.log("click");
      }
    });
  }

  setCards();
}

function setCards() {
  const field = document.getElementById("field");

  for (let i = 0; i < 16; i++) {
    if (field) {
      field.innerHTML += cardTemplate();
    }
  }
}

function cardTemplate() {
  return '<button class="card"><div class="card__inner"><div class="card__face"></div><div class="card__face card__face--back">a</div></div></button>';
}
