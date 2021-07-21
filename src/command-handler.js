const { spawn } = require('child_process')

const handle = (command, args) => new Promise((resolve, reject) => {
  const cmd = spawn(command, args)

  cmd.stdout.on('data', (data) => process.stdout.write(data))
  cmd.stderr.on('data', (data) => process.stderr.write(data))
  cmd.on('error', reject)
  cmd.on('close', code => code === 0 ? resolve(code) : reject(`Command exited with ${code} code`))
})

module.exports = {
  handle,
}
