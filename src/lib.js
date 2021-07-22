const { spawn } = require('child_process')
const ncu = require('npm-check-updates')
const path = require('path')

const handle = (command, args, { rejectOnNonZeroCode = true } = {}) => new Promise((resolve, reject) => {
  const cmd = spawn(command, args)

  cmd.stdout.on('data', (data) => process.stdout.write(data))
  cmd.stderr.on('data', (data) => process.stderr.write(data))
  cmd.on('error', reject)
  cmd.on('close', code => code !== 0 && rejectOnNonZeroCode ? reject(code) : resolve(code))
})

const update = async () => {
  const updated = await ncu.run({
    packageFile: path.resolve(__dirname, '..', 'package.json'),
    upgrade: true,
  })
  const entries = Object.entries(updated)

  if (entries.length === 0) {
    console.log('No packages found to update')
    return 0
  }

  console.log('Updating dependencies:')
  entries.forEach(([pkg, version]) => console.log(`${pkg}: ${version}`))
  return entries.length
}

module.exports = {
  handle,
  update,
}
