// Vite turns this import into a production-safe URL. Keep it as a file so
// even this tiny example demonstrates a separately deployed asset.
// @deno-types="./asset-url.d.ts"

// @deno-types="./asset-url.d.ts"
import titleUrl from "./assets/cafe_clicker_title.png?no-inline";
// @deno-types="./asset-url.d.ts"
import coffeeCupUrl from "./assets/coffeecup.png?no-inline";

const app = document.querySelector<HTMLElement>("#app")!;

const BARISTA_CUPS_PER_SECOND = 1;
const BARISTA_BASE_COST = 10;
const BARISTA_COST_MULTIPLIER = 1.25;

let cupsOfCoffee = 0;
let baristas = 0;

let previousTimestamp = 0; //time of the last frame
let firstFrame = true; //true until we have seen one frame

function getCoffeePerSecond(): number {
  return baristas * BARISTA_CUPS_PER_SECOND;
}

function getBaristaCost(): number {
  return Math.ceil(
    BARISTA_BASE_COST * BARISTA_COST_MULTIPLIER ** baristas,
  );
}

function growCoffee(secondsPassed: number) {
  const coffeeEarned = getCoffeePerSecond() * secondsPassed;
  cupsOfCoffee += coffeeEarned;
}

function onFrame(currentTimestamp: number) {
  if (firstFrame) {
    //theres no earlier fram to compare it with so just record the time
    previousTimestamp = currentTimestamp;
    firstFrame = false;
  } else {
    const millisecondsPassed = currentTimestamp - previousTimestamp;
    const secondsPassed = millisecondsPassed / 1000;

    growCoffee(secondsPassed);
    updateDisplay();

    previousTimestamp = currentTimestamp;
  }
  requestAnimationFrame(onFrame); //asks the browser for the next frame
}

const heading = document.createElement("h1");
const titleImage = document.createElement("img");
titleImage.src = titleUrl;
titleImage.alt = "Cafe Clicker";
titleImage.className = "title-image";
heading.append(titleImage);

const numCoffeeDisplay = document.createElement("p");
const baristaInfoDisplay = document.createElement("p");
const productionDisplay = document.createElement("p");
const numBaristasDisplay = document.createElement("p");

const brewButton = document.createElement("button");
brewButton.id = "brew-button";
brewButton.setAttribute("aria-label", "Brew coffee");

const cupImage = document.createElement("img");
cupImage.src = coffeeCupUrl;
cupImage.alt = "";
cupImage.draggable = false;
brewButton.append(cupImage);

const baristaButton = document.createElement("button");
baristaButton.textContent = "Hire Barista";

brewButton.addEventListener("click", () => {
  cupsOfCoffee++;
  updateDisplay();
});

baristaButton.addEventListener("click", () => {
  const cost = getBaristaCost();
  if (cupsOfCoffee < cost) return; //they cant afford it
  cupsOfCoffee -= cost;
  baristas++;
  updateDisplay();
});

function updateDisplay() {
  baristaButton.disabled = cupsOfCoffee < getBaristaCost();

  numCoffeeDisplay.textContent = `Coffees: ${Math.floor(cupsOfCoffee)}`;
  numBaristasDisplay.textContent = `Baristas: ${baristas}`;

  const nextPrice = Math.ceil(
    BARISTA_BASE_COST * BARISTA_COST_MULTIPLIER ** (baristas + 1),
  );
  const percentIncrease = Math.round((BARISTA_COST_MULTIPLIER - 1) * 100);

  baristaInfoDisplay.textContent =
    `Price of Barista: ${getBaristaCost()} coffees (next one: ${nextPrice}, ` +
    `+${percentIncrease}% each hire)`;
  productionDisplay.textContent = `Total: ${
    getCoffeePerSecond().toFixed(1)
  } coffees/sec`;
}

app.append(
  heading,
  numCoffeeDisplay,
  numBaristasDisplay,
  brewButton,
  baristaButton,
  productionDisplay,
  baristaInfoDisplay,
);

updateDisplay();
requestAnimationFrame(onFrame);
