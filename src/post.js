const { handle } = require('./lib')

;(async () => {
  try {
    const diff = await handle('git', ['diff', '--quiet', 'package.json'], { rejectOnNonZeroCode: false }) +
      await handle('git', ['diff', '--quiet', 'package-lock.json'], { rejectOnNonZeroCode: false })
    if (diff === 0) {
      process.stdout.write('No changes detected.\n')
      process.exit(0)
    }
    await handle('git', ['add', 'package.json', 'package-lock.json'])

    const user = 'osh-npm-updater'
    const email = 'osh-npm-updater@oshdev.com'
    const author = `${user} <${email}>`
    const message = 'chore: update npm dependencies' // @todo add list of dependencies
    const config = ['-c', `user.email=${email}`, '-c', `user.name=${user}`]

    await handle('git', [...config, 'commit', '--author', author, '-m', message])
    await handle('git', [...config, 'push'])
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
