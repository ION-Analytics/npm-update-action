const { spawn } = require("child_process");

// const update = spawn('npm', ['install', '--help'])
const update = spawn('npm', ['install', '--ignore-scripts', '--tag', 'latest'])

update.stdout.on('data', (data) => process.stdout.write(data))
update.stderr.on('data', (data) => process.stderr.write(data))
update.on('error', (error) => process.stderr.write(`${error}`))
update.on('close', (code) => process.exit(code))
