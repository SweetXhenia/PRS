let rockBtn = document.querySelector(".rock");
let scissorsBtn = document.querySelector(".scissors");
let paperBtn = document.querySelector(".paper");

function computerChoice() {
  let options = ["kámen", "nůžky", "papír"];
  let randomOption = Math.floor(Math.random() * options.length);
  return options[randomOption];
}

function playRound(tah) {
  let text = document.querySelector(".game-winner");
  let computerPick = computerChoice();

  if (
    (tah === "kámen" && computerPick === "kámen") ||
    (tah === "papír" && computerPick === "papír") ||
    (tah === "nůžky" && computerPick === "nůžky")
  ) {
    text.textContent = "Je to remíza";
  } else if (
    (tah === "nůžky" && computerPick === "papír") ||
    (tah === "kámen" && computerPick === "nůžky") ||
    (tah === "papír" && computerPick === "kámen")
  ) {
    text.textContent = "Vyhráváš!";
  } else{
    text.textContent = "Vyhrává počítač!";
  }
}

rockBtn.addEventListener("click", function () {
  playRound("kámen");
});

scissorsBtn.addEventListener("click", function () {
  playRound("nůžky");
});

paperBtn.addEventListener("click", function () {
  playRound("papír");
});
