// Vite turns this import into a production-safe URL. Keep it as a file so
// even this tiny example demonstrates a separately deployed asset.
// @deno-types="./asset-url.d.ts"

const app = document.querySelector<HTMLElement>("#app")!;

let cupsOfCoffee = 0;

const heading = document.createElement("h1");
heading.textContent = "D1 project";

const numCoffeeDisplay = document.createElement("p");
numCoffeeDisplay.textContent = "Coffees: " + cupsOfCoffee;

const brewButton = document.createElement("button");
brewButton.textContent = "Brew Coffee";

brewButton.addEventListener("click", () => {
  cupsOfCoffee++;
  numCoffeeDisplay.textContent = "Coffees: " + `${cupsOfCoffee}`;
  console.log(cupsOfCoffee);
});

app.append(heading, numCoffeeDisplay, brewButton);
