// Vite turns this import into a production-safe URL. Keep it as a file so
// even this tiny example demonstrates a separately deployed asset.
// @deno-types="./asset-url.d.ts"

// @deno-types="./asset-url.d.ts"
import titleUrl from "./assets/cafe_clicker_title.png?no-inline";
// @deno-types="./asset-url.d.ts"
import coffeeCupUrl from "./assets/coffeecup.png?no-inline";

const app = document.querySelector<HTMLElement>("#app")!;

const BARISTA_CUPS_PER_SECOND = .65;
const BARISTA_BASE_COST = 10;
const BARISTA_COST_MULTIPLIER = 1.25;
const betterBaseCost = 20;
const betterCostMult = 2;

let cupsOfCoffee = 0;
let cupsPerClick = 1;
let baristas = 0;
let coffeeMachines = 0;

let previousTimestamp = 0; //time of the last frame
let firstFrame = true; //true until we have seen one frame

function getCoffeePerSecond(): number {
  return baristas * BARISTA_CUPS_PER_SECOND + getUpgradeCoffeePerSecond();
}

function getBaristaCost(): number {
  return Math.ceil(
    BARISTA_BASE_COST * BARISTA_COST_MULTIPLIER ** baristas,
  );
}

function getMachineCost(): number {
  return Math.ceil(betterBaseCost * betterCostMult ** coffeeMachines);
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
const numPerClick = document.createElement("p");
const machinesInfoDisplay = document.createElement("p");

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

const coffeeMachineButton = document.createElement("button");
coffeeMachineButton.textContent = "Get coffee machine";

brewButton.addEventListener("click", () => {
  cupsOfCoffee += cupsPerClick;
  updateDisplay();
});

baristaButton.addEventListener("click", () => {
  const cost = getBaristaCost();
  if (cupsOfCoffee < cost) return; //they cant afford it
  cupsOfCoffee -= cost;
  baristas++;
  updateDisplay();
});

coffeeMachineButton.addEventListener("click", () => {
  const cost = getMachineCost();
  if (cupsOfCoffee < cost) return;
  cupsOfCoffee -= cost;
  coffeeMachines++;
  cupsPerClick++;
  updateDisplay();
});

//these upgrades are going to be handled by the same cost, purchase
//and display code. the new upgrades should be added to this i think
//instead of coping the barista/machine stuff that we have going on up there
//because they all have their own constants, cost function, and click listener

const upgrades = [
  {
    name: "Pastry case",
    description: "Customers stay longer and order more",
    baseCost: 50,
    costMultiplier: 1.3,
    coffeePerSecond: 2,
    coffeePerClick: 0,
    owned: 0,
  },
  {
    name: "Espresso blend",
    description: "Premium beans make every click stronger",
    baseCost: 100,
    costMultiplier: 1.5,
    coffeePerSecond: 0,
    coffeePerClick: 3,
    owned: 0,
  },
];

//the cost of upgrade number "index"
function getUpgradeCost(index: number): number {
  const upgrade = upgrades[index];
  return Math.ceil(upgrade.baseCost * upgrade.costMultiplier ** upgrade.owned);
}

//adds the coffee per second from all the upgrades in the list
function getUpgradeCoffeePerSecond(): number {
  let total = 0;
  for (let i = 0; i < upgrades.length; i++) {
    const upgrade = upgrades[i];
    total += upgrade.owned * upgrade.coffeePerSecond;
  }
  return total;
}

//buying stuff also just works the same way for all the upgrades in the list
function buyUpgrade(index: number) {
  const upgrade = upgrades[index];
  const cost = getUpgradeCost(index);
  if (cupsOfCoffee < cost) return; //too broke :p
  cupsOfCoffee -= cost;
  upgrade.owned++;
  cupsPerClick += upgrade.coffeePerClick;
  updateDisplay();
}

//button a little info like for each
const upgradeButtons: HTMLButtonElement[] = [];
const upgradeInfoDisplays: HTMLParagraphElement[] = [];

for (let i = 0; i < upgrades.length; i++) {
  const button = document.createElement("button");
  button.addEventListener("click", () => {
    buyUpgrade(i);
  });

  const info = document.createElement("p");

  upgradeButtons.push(button);
  upgradeInfoDisplays.push(info);
}

function updateDisplay() {
  baristaButton.disabled = cupsOfCoffee < getBaristaCost();
  coffeeMachineButton.disabled = cupsOfCoffee < getMachineCost();

  numPerClick.textContent = `Coffees per click ${Math.floor(cupsPerClick)}`;
  numCoffeeDisplay.textContent = `Coffees: ${Math.floor(cupsOfCoffee)}`;
  numBaristasDisplay.textContent = `Baristas: ${baristas}`;

  baristaInfoDisplay.textContent =
    `Price of Barista: ${getBaristaCost()} coffees`;
  productionDisplay.textContent = `Total: ${
    getCoffeePerSecond().toFixed(1)
  } coffees/sec`;
  machinesInfoDisplay.textContent =
    `Price of coffee machine: ${getMachineCost()} coffees`;

  for (let i = 0; i < upgrades.length; i++) {
    const upgrade = upgrades[i];
    const cost = getUpgradeCost(i);

    upgradeButtons[i].textContent = `Buy ${upgrade.name} (${cost} coffees)`;
    upgradeButtons[i].disabled = cupsOfCoffee < cost;
    upgradeInfoDisplays[i].textContent =
      `${upgrade.name} owned: ${upgrade.owned}. ${upgrade.description}`;
  }
}

app.append(
  heading,
  numCoffeeDisplay,
  numBaristasDisplay,
  numPerClick,
  brewButton,
  baristaButton,
  coffeeMachineButton,
  productionDisplay,
  baristaInfoDisplay,
  machinesInfoDisplay,
);

for (let i = 0; i < upgrades.length; i++) {
  app.append(upgradeButtons[i], upgradeInfoDisplays[i]);
}

updateDisplay();
requestAnimationFrame(onFrame);
