import { nav } from "../components/nav"

export function end(score) {
  return `
    ${nav()}
    <main>
      <h2>Fin de la partie</h2>
      <div>Votre score : ${score}</div>
      <button id="restart">Recommencer</button>
    </main>
  `
}
