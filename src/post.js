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

    await handle('git',
      ['-c', 'user.email', email, '-c', 'user.name', user, 'commit', '--author', author, '--message', message])
    await handle('git', ['push'])
  } catch (e) {
    process.exit(typeof e === 'number' ? e : 1)
  }
})()
