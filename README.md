## Cafe Clicker

A simple Clicker browser game made with TypeScript/Vite. Click to brew coffee and buy upgrades for your shop.

## Playable Link

https://effrronbane.github.io/D1-cmpm-121/

## Run Instructions

0. Install Deno
1. Clone
2. Run deno task setup and deno task dev
3. Make changes
4. Run deno task ci before pushing
5. Commit and push with relevant commit message

## Explanation

All changes made in src/main.ts. Shared upgrade behavior is held in the upgrades array and new content is added as data entries (https://github.com/effrronbane/D1-cmpm-121/commit/86787efcc96ccc9786b0e3e0aaa31de8641d5970). getUpgradeCost, getUpgradeCoffeePerSecond, buyUpgrade, and display loops process data uniformly to ensure adding new content is seamless. This allows for adding new upgrades as data rather than hard coding (https://github.com/effrronbane/D1-cmpm-121/commit/4bdf7b39f90212fe862bc0323e0acb7e9bea7a9d).

## Credits

Trinity Willis
Gustavo Gutierrez
Aimee Solarz

Tooling adapted from the CMPM 121 Fall 2026 S01 starter, which has no explicit repository license. No new license is assigned to that material. The D1 scaffold and original SVG were authored with OpenAI GPT-6 Astra assistance. Dependencies retain their respective licenses.

## Documentation used:

- https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
- https://developer.mozilla.org/en-US/docs/Web/API/Window/setInterval
- https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame
- https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/image-rendering
- https://developer.mozilla.org/en-US/docs/Web/API/HTMLButtonElement
- https://developer.mozilla.org/en-US/docs/Web/API/HTMLParagraphElement

## Art

- Title Art: https://fontmeme.com/
- Coffee Cup: Aimee Solarz
