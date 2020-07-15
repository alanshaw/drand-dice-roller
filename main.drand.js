/* global BigInt */

import { roll } from './roller.js'
import Client, { HTTP } from 'https://cdn.jsdelivr.net/npm/drand-client/drand.js'

const chainHash = '84b2234fb34e835dccd048255d7ad3194b81af7d978c3bf157e3469592ae4e02'

const urls = [
  'https://pl-us.testnet.drand.sh',
  'https://pl-eu.testnet.drand.sh',
  'https://pl-sin.testnet.drand.sh'
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
    const num = (BigInt('0x' + rand.randomness) % 24n + 1n).toString(10)

    await currentRoll.stop(num)
    btn.removeAttribute('disabled')
  })
}

main()
