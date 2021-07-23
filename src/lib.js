const { spawn } = require('child_process')
const path = require('path')

const handle = (command, args, { rejectOnNonZeroCode = true } = {}) => new Promise((resolve, reject) => {
  const cmd = spawn(command, args)

  cmd.stdout.on('data', (data) => process.stdout.write(data))
  cmd.stderr.on('data', (data) => process.stderr.write(data))
  cmd.on('error', reject)
  cmd.on('close', code => code !== 0 && rejectOnNonZeroCode ? reject(code) : resolve(code))
})

module.exports = {
  handle,
}
