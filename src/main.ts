// Vite turns this import into a production-safe URL. Keep it as a file so
// even this tiny example demonstrates a separately deployed asset.
// @deno-types="./asset-url.d.ts"

const app = document.querySelector<HTMLElement>("#app")!;

const heading = document.createElement("h1");
heading.textContent = "D1 project";

const message = document.createElement("p");
message.textContent = "Click to brew a coffee";

const brewButton = document.createElement("button");
brewButton.textContent = "Brew Coffee";

brewButton.addEventListener("click", () => console.log("Brewing Coffee"));

app.append(heading, message, brewButton);
