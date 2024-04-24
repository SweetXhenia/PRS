let roundsPlayed = 0; //tah, který byl odehraný, nastavený na 0
let maxRounds = 5; 

let userResults = 0; //nastavení výsledku na hodnotu 0
let computerResults = 0; //nastavení výsledku na hodnotu 0

let rockBtn = document.querySelector(".rock"); //tlačítko kámen
let scissorsBtn = document.querySelector(".scissors"); //tlačítko nůžky
let paperBtn = document.querySelector(".paper"); //tlačítko papír

let resetBtn = document.querySelector(".restart"); //tlačítko resetuje hru
let clearBtn = document.querySelector(".clear"); //tlačítko vymaže historii

let gameRounds = document.querySelector(".game-rounds")
let roundButtons = document.querySelectorAll(".rounds")
let round5 = document.querySelector(".rounds5"); //tlačítko určující maximální počet kol
let round10 = document.querySelector(".rounds10");
let round15 = document.querySelector(".rounds15");
let round20 = document.querySelector(".rounds20");

roundButtons.forEach(function(button){
  button.addEventListener("click", function(){
    roundButtons.forEach(function(btn){
      btn.style.opacity = "0.3"
    })
    this.style.opacity = "1"
  })
})

function maxPocetKol(max) {
  
  if (max === 5) {
    maxRounds = 5;
  } else if (max === 10) {
    maxRounds = 10;
  } else if (max === 15) {
    maxRounds = 15;
  } else if (max === 20) {
    maxRounds = 20;
  }
  return maxRounds
}

round5.addEventListener("click", function () {
  maxRounds = maxPocetKol(5);
  console.log(maxRounds);
});

round10.addEventListener("click", function () {
  maxRounds = maxPocetKol(10);
  console.log(maxRounds);
});

round15.addEventListener("click", function () {
  maxRounds = maxPocetKol(15);
  console.log(maxRounds);
});

round20.addEventListener("click", function () {
  maxRounds = maxPocetKol(20);
  console.log(maxRounds);
});



//?-------Logika, která určije, co vybere počítač
function computerChoice() {
  let options = ["kámen", "nůžky", "papír"]; //může vybrat z těchto voleb
  let randomOption = Math.floor(Math.random() * options.length); // zaokrouhlení dolů, náhodný výběr z pole "option"
  return options[randomOption]; //vrátí mi to výsledek
}

//?-----------funkce, ktrá se uplatní po odehrání jednoho tahu
function playRound(tah) {
  let title = document.querySelector(".game-title"); //nadpis "kámen, nůžky, papír"
  let text = document.querySelector(".game-winner"); //text, kdo vyhrává tah i kolo
  let pickText = document.querySelector(".game-choices"); //text co si vybral člověk
  let scoreHuman = document.querySelector(".game-score__human"); //score člověka
  let scoreComputer = document.querySelector(".game-score__computer"); //score počítače

  let roundCounter = document.querySelector(".game-round"); //ukazatel odehraných kol

  let computerPick = computerChoice(); //proměnná pro funkci, co si vybere počítač

  if (
    //todo------------pokud hráči vyberou stejný prvek
    (tah === "kámen" && computerPick === "kámen") ||
    (tah === "papír" && computerPick === "papír") ||
    (tah === "nůžky" && computerPick === "nůžky")
  ) {
    text.textContent = "Je to remíza"; // vypíše text
    text.style.color = "#2266BC"; // změní barvu na neutrální
    pickText.innerHTML = `<b>Ty x počítač</b> <br><br> ${tah} <b>x</b> ${computerPick}`; //vypíše co si vybral člověka co počítač
  } else if (
    //todo-------------pokud vyhraje člověk
    (tah === "nůžky" && computerPick === "papír") ||
    (tah === "kámen" && computerPick === "nůžky") ||
    (tah === "papír" && computerPick === "kámen")
  ) {
    text.textContent = "Vyhráváš!";
    text.style.color = "green";
    pickText.innerHTML = `<b>Ty x počítač</b> <br><br> ${tah} <b>x</b> ${computerPick}`;

    userResults++; //připíše se bod člověku
  } else {
    //todo------------------pokud vyhraje počítač
    text.textContent = "Vyhrává počítač!";
    text.style.color = "red";
    pickText.innerHTML = `<b>Ty x počítač</b> <br><br> ${tah} <b>x</b> ${computerPick}`;
    computerResults++; //připíše bod počítači
  }

  roundsPlayed++; //přičte se, o jednu, odehrané kolo

  roundCounter.textContent = `${roundsPlayed} kolo z ${maxRounds}`; //vypíše aktuálně odehraný tah a maximální počet tahů

  scoreHuman.innerHTML = `Tvé score: <b>${userResults}</b>`; //vypíše celkové score člověka
  scoreComputer.innerHTML = `Počítačovo score: <b>${computerResults}</b>`; //vypíše celkové score počítače

  //?----------podmínka pro odehrání kola
  //todo----pokud je odehrané kolo větší nebo rovno maximálnímu počtu tahů
  if (roundsPlayed >= maxRounds) {
    //změní text na tyto styly
    text.textContent = "Výsledky";
    text.style.color = "#2266BC";
    text.style.fontSize = "1.5rem";

    //přestane zobrazovat tlačítka
    rockBtn.style.display = "none";
    scissorsBtn.style.display = "none";
    paperBtn.style.display = "none";

    //informuje hráče o ukončení hry
    title.textContent = "Hra skončila";
    title.style.color = "#12BE2D";

    //smaže aktuální výsledky
    scoreComputer.textContent = "";
    scoreHuman.textContent = "";

    //?---podmínka při ukončení hry
    //todo---pokud počítač vyhrál
    if (computerResults > userResults) {
      //změní se tyto styly
      roundCounter.innerHTML = `Prohrál jsi s počítačem <br><b>${computerResults} : ${userResults}</b>`; //vypíše score
      roundCounter.style.color = "red";
      roundCounter.style.fontSize = "1.3rem";
    } else if (computerResults < userResults) {
      //todo pokud počítač prohrál
      roundCounter.innerHTML = `Vyhrál jsi proti počítači <br><b>${userResults} : ${computerResults}</b>`; //vypíše score
      roundCounter.style.color = "green";
      roundCounter.style.fontSize = "1.3rem";
    } else {
      //todo pokud hra skončila remízou
      roundCounter.innerHTML = `Hra skončila remízou <br><b>${userResults} : ${computerResults}</b>`; //vypíše score
      roundCounter.style.color = "#2266BC";
      roundCounter.style.fontSize = "1.3rem";
    }

    //?----------localStorage pokusy
    let userHistoryScore = document.getElementById("human");
    let computerHistoryScore = document.getElementById("computer");

    let score = [{ human: userResults, computer: computerResults }];
    let scoreFromLocalSt = JSON.parse(localStorage.getItem("score"));
    let scoreToSave = JSON.stringify(score);

    if (scoreFromLocalSt) {
      scoreToSave = scoreToSave + JSON.stringify(scoreFromLocalSt);
      console.log(scoreToSave);
    } else {
      localStorage.setItem("score", scoreToSave);
    }

    resetBtn.style.display = "inline-block";
  }
}

//?-------tlačítko pro kámen, pokud člověk zvolí kámen, spustí se funkce playRound
rockBtn.addEventListener("click", function () {
  playRound("kámen");
});

scissorsBtn.addEventListener("click", function () {
  playRound("nůžky");
});

paperBtn.addEventListener("click", function () {
  playRound("papír");
});

//?   pokud se dohraje hra, člověk může hru resetovat a hrát znovu od začátku
resetBtn.addEventListener("click", function () {
  location.reload(); //načtení stránky
});

//?    pokud člověk chce vymazat historii svých kol
clearBtn.addEventListener("click", function () {
  localStorage.clear(); //vymaže celkový localStorage
});
