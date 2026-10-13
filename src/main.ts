// Vite turns this import into a production-safe URL. Keep it as a file so
// even this tiny example demonstrates a separately deployed asset.
// @deno-types="./asset-url.d.ts"

const app = document.querySelector<HTMLElement>("#app")!;

const BARISTA_CUPS_PER_SECOND = 1;

let cupsOfCoffee = 0;
let baristas = 0;

setInterval(() => {
  cupsOfCoffee += baristas * BARISTA_CUPS_PER_SECOND;
  updateDisplay();
}, 1000 / BARISTA_CUPS_PER_SECOND);

const heading = document.createElement("h1");
heading.textContent = "D1 project";

const numCoffeeDisplay = document.createElement("p");
const numBaristasDisplay = document.createElement("p");

updateDisplay();

const brewButton = document.createElement("button");
brewButton.textContent = "Brew Coffee";

const baristaButton = document.createElement("button");
baristaButton.textContent = "Hire Barista";

brewButton.addEventListener("click", () => {
  cupsOfCoffee++;
  updateDisplay();
});

baristaButton.addEventListener("click", () => {
  baristas++;
  updateDisplay();
});

function updateDisplay() {
  numCoffeeDisplay.textContent = `Coffees: ${cupsOfCoffee}`;
  numBaristasDisplay.textContent =
    `Baristas (${BARISTA_CUPS_PER_SECOND} coffee/sec): ${baristas}`;
}

app.append(
  heading,
  numCoffeeDisplay,
  numBaristasDisplay,
  brewButton,
  baristaButton,
);
