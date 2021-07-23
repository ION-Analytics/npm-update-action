const { handle, update } = require('./lib')

console.log('version', process.version)

;(async () => {
  try {
    const updated = await update()
    if (updated === 0) process.exit(0)
    await handle('npm', ['install', '--ignore-scripts'])
  } catch (e) {
    let code = 1
    if (typeof e === 'number') {
      code = e
      e = new Error(`Command returned ${code} code`)
    }
    console.log(e)
    process.exit(code)
  }
})()
