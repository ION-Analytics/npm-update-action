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
    await handle('git',
      ['commit', '--author', process.env['GITHUB_ACTOR'], '--message', 'chore: update npm dependencies'])
    // await handle('git', ['push'])
  } catch (e) {
    process.exit(typeof e === 'number' ? e : 1)
  }
})()
