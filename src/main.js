const { handle } = require('./command-handler')

;(async () => {
  await handle('npm', ['update'])
})()
