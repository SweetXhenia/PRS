let roundsPlayed = 0;
const maxRounds = 5;

let userResults = 0;
let computerResults = 0;

let rockBtn = document.querySelector(".rock");
let scissorsBtn = document.querySelector(".scissors");
let paperBtn = document.querySelector(".paper");

let resetBtn = document.querySelector(".restart");

let clearBtn = document.querySelector(".clear");

function computerChoice() {
  let options = ["kámen", "nůžky", "papír"];
  let randomOption = Math.floor(Math.random() * options.length);
  return options[randomOption];
}

function playRound(tah) {
  let title = document.querySelector(".game-title");
  let text = document.querySelector(".game-winner");
  let pickText = document.querySelector(".game-choices");
  let scoreHuman = document.querySelector(".game-score__human");
  let scoreComputer = document.querySelector(".game-score__computer");

  let roundCounter = document.querySelector(".game-round");

  let computerPick = computerChoice();

  if (
    (tah === "kámen" && computerPick === "kámen") ||
    (tah === "papír" && computerPick === "papír") ||
    (tah === "nůžky" && computerPick === "nůžky")
  ) {
    text.textContent = "Je to remíza";
    text.style.color = "#2266BC";
    pickText.innerHTML = `<b>Ty x počítač</b> <br><br> ${tah} <b>x</b> ${computerPick}`;
  } else if (
    (tah === "nůžky" && computerPick === "papír") ||
    (tah === "kámen" && computerPick === "nůžky") ||
    (tah === "papír" && computerPick === "kámen")
  ) {
    text.textContent = "Vyhráváš!";
    text.style.color = "green";
    pickText.innerHTML = `<b>Ty x počítač</b> <br><br> ${tah} <b>x</b> ${computerPick}`;

    userResults++;
  } else {
    text.textContent = "Vyhrává počítač!";
    text.style.color = "red";
    pickText.innerHTML = `<b>Ty x počítač</b> <br><br> ${tah} <b>x</b> ${computerPick}`;
    computerResults++;
  }

  roundsPlayed++;

  roundCounter.textContent = `${roundsPlayed} kolo z ${maxRounds}`;

  scoreHuman.innerHTML = `Tvé score: <b>${userResults}</b>`;
  scoreComputer.innerHTML = `Počítačovo score: <b>${computerResults}</b>`;

  if (roundsPlayed >= maxRounds) {
    text.textContent = "Výsledky";
    text.style.color = "#2266BC";
    text.style.fontSize = "1.5rem";

    rockBtn.style.display = "none";
    scissorsBtn.style.display = "none";
    paperBtn.style.display = "none";

    title.textContent = "Hra skončila";
    title.style.color = "#12BE2D";

    scoreComputer.textContent = "";
    scoreHuman.textContent = "";

    if (computerResults > userResults) {
      roundCounter.innerHTML = `Prohrál jsi s počítačem <br><b>${computerResults} : ${userResults}</b>`;
      roundCounter.style.color = "red";
      roundCounter.style.fontSize = "1.3rem";
    } else if (computerResults < userResults) {
      roundCounter.innerHTML = `Vyhrál jsi proti počítači <br><b>${userResults} : ${computerResults}</b>`;
      roundCounter.style.color = "green";
      roundCounter.style.fontSize = "1.3rem";
    } else {
      roundCounter.innerHTML = `Hra skončila remízou <br><b>${userResults} : ${computerResults}</b>`;
      roundCounter.style.color = "#2266BC";
      roundCounter.style.fontSize = "1.3rem";
    }

    resetBtn.style.display = "inline-block";
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

resetBtn.addEventListener("click", function () {
  location.reload();
});

clearBtn.addEventListener("click", function () {
  localStorage.clear();
});
