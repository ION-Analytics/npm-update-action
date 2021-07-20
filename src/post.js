const { exec } = require("child_process");

const printOrError = (e, stdout, stderr) => {
  if (e) {
    console.error(e)
    return
  }
  if (stderr) {
    console.error(stderr)
    return
  }
  console.log(stdout)
}

exec('cat package.json', printOrError)
exec('cat package-lock.json', printOrError)
