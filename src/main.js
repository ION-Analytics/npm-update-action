const { handle } = require('./lib')

console.log('version', process.version)

;(async () => {
  try {
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
