import { nav } from "../components/nav";

export function game(size) {
  return `
    ${nav()}
    <main>
      <div id="game">
        <div>Score : <span id="score"></span></div>
        <div>
          <canvas height="${size}" width="${size}">
          </canvas>
        </div>
        <div id="pause-overlay" class="hidden">
          <div>
            <button id="overlay-unpause">Reprendre</button>
            <button id="overlay-restart">Recommencer</button>
            <button id="overlay-end">Accueil</button>
          </div>
        </div>
      </div>
      <button id="pause">Pause</button>
    </main>
  `;
}
