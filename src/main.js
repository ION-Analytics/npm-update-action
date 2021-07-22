const { handle, update } = require('./lib')

;(async () => {
  try {
    await update()
    await handle('npm', ['install', '--no-scripts'])
  } catch (e) {
    process.exit(typeof e === 'number' ? e : 1)
  }
})()
