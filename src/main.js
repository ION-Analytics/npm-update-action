const { handle, handleError } = require('./lib')

;(async () => {
  try {
    // this is fucking bonkers
    // install needs to create node_modules so the update command
    // will update both package.json and package-lock.json
    await handle('npm', ['install', '--ignore-scripts'])
    await handle('npm', ['update'])
  } catch (e) {
    handleError(e)
  }
})()
