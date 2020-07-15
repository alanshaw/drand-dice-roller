import { roll } from './roller.js'

function main () {
  const diceEl = document.getElementById('dice')
  const rollBtn = document.getElementById('roll')
  let currentRoll

  rollBtn.addEventListener('click', e => {
    const btn = e.target
    btn.setAttribute('disabled', true)

    currentRoll = roll(diceEl)

    setTimeout(async () => {
      await currentRoll.stop(4)
      currentRoll = null
      btn.removeAttribute('disabled')
    }, 5000)
  })
}

main()
