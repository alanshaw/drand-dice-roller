/* global BigInt */

import { roll } from './roller.js'
import Client, { HTTP } from 'https://cdn.jsdelivr.net/npm/drand-client/drand.js'

const chainHash = '8990e7a9aaed2ffed73dbd7092123d6f289930540d7651336225dc172e51b2ce'

const urls = [
  'https://api.drand.sh',
  'https://drand.cloudflare.com'
]

async function main () {
  const client = await Client.wrap(
    HTTP.forURLs(urls, chainHash),
    { chainHash }
  )

  const diceEl = document.getElementById('dice')
  const rollBtn = document.getElementById('roll')
  let currentRoll

  rollBtn.addEventListener('click', async e => {
    const btn = e.target
    btn.setAttribute('disabled', true)

    currentRoll = roll(diceEl)

    const round = client.roundAt(Date.now()) + 1
    const rand = await client.get(round)
    const num = (BigInt('0x' + rand.randomness) % 20n + 1n).toString(10)

    await currentRoll.stop(num)
    btn.removeAttribute('disabled')
  })
}

main()
