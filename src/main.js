const { handle } = require('./command-handler')

;(async () => {
  try {
    await handle('npm', ['update'])
  } catch (e) {
    process.exit(typeof e === 'number' ? e : 1)
  }
})()
