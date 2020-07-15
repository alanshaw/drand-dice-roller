const randomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min

export function roll (el, duration) {
  duration = duration || 25000
  let interval = 100

  const intervalID = setInterval(() => { interval += 100 }, duration / 10)
  const setValue = v => { el.textContent = v }

  let lastValue
  const done = new Promise(resolve => {
    const next = () => {
      if (lastValue) {
        setValue(lastValue)
        return resolve()
      }
      setValue(randomInt(1, 21))
      setTimeout(next, interval)
    }
    next()
  })

  const stop = v => {
    clearInterval(intervalID)
    lastValue = v || randomInt(1, 21)
    return done
  }

  return { stop }
}
