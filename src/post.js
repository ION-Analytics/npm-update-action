const { handle } = require('./command-handler')

;(async () => {
  try {
    await handle('git', ['add', 'package.json', 'package-lock.json'])
    await handle('git', ['commit', '--message', 'chore: update npm dependencies'])
    // await handle('git', ['push'])
  } catch (e) {
    process.exit(typeof e === 'number' ? e : 1)
  }
})()
