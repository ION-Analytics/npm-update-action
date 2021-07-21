const { handle } = require('./command-handler')

;(async () => {
  await handle('git', ['add', 'package.json', 'package-lock.json'])
  await handle('git', ['commit', '--message', 'chore: update npm dependencies'])
  // await handle('git', ['push'])
})()
