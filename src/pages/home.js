import { nav } from "../components/nav";

export function home() {
  return `
    ${nav()}
    <main>
      <h1>Bienvenue !</h1>
      <h2>C'est le jeu du serpent :</h2>
      <button id="start">Nouvelle partie</button>
    </main>
  `;
}
