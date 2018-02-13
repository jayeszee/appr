const childProcess = require('child_process');

/*
 * Spawn a child process with a callback when the process exits
 */
module.exports = function spawn(task, args, onClose) {
  let closed = false;
  const child = childProcess.spawn(task, args, {
    stdio: 'inherit',
    env: process.env
  });

  child.on('error', error => {
    console.log(error);
  });
  child.on('close', code => {
    if (closed) {return;}
    onClose(code);
    closed = true;
  });

  child.on('exit', code => {
    if (closed) {return;}
    onClose(code);
    closed = true;
  });
};
