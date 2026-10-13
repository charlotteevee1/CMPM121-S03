// Vite turns this import into a production-safe URL. Keep it as a file so
// even this tiny example demonstrates a separately deployed asset.
// @deno-types="./asset-url.d.ts"

const app = document.querySelector<HTMLElement>("#app")!;

const BARISTA_CUPS_PER_SECOND = 1;

let cupsOfCoffee = 0;
let baristas = 1;

setInterval(() => {
  cupsOfCoffee += baristas * BARISTA_CUPS_PER_SECOND;
  updateCoffeeDisplay();
}, 1000 / BARISTA_CUPS_PER_SECOND);

const heading = document.createElement("h1");
heading.textContent = "D1 project";

const numCoffeeDisplay = document.createElement("p");
numCoffeeDisplay.textContent = "Coffees: " + cupsOfCoffee;

const numBaristasDisplay = document.createElement("p");
numBaristasDisplay.textContent = "Baristas " + "(" + BARISTA_CUPS_PER_SECOND +
  " coffee/sec)" + " : " + baristas;

const brewButton = document.createElement("button");
brewButton.textContent = "Brew Coffee";

brewButton.addEventListener("click", () => {
  cupsOfCoffee++;
  updateCoffeeDisplay();
});

function updateCoffeeDisplay() {
  numCoffeeDisplay.textContent = "Coffees: " + cupsOfCoffee;
}

app.append(heading, numCoffeeDisplay, numBaristasDisplay, brewButton);
