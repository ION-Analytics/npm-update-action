const { handle } = require('./command-handler')

;(async () => {
  try {
    console.log(Object.entries(process.env).reduce((a, [k, v]) => ({...a, [k]: v.substr(0, 3)}), {}))
    await handle('git', ['add', 'package.json', 'package-lock.json'])
    await handle('git', ['commit', '--message', 'chore: update npm dependencies'])
    // await handle('git', ['push'])
  } catch (e) {
    process.exit(typeof e === 'number' ? e : 1)
  }
})()
