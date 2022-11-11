const ora = require("ora");

async function loading(message, fn, ...args) {
  const spinner = ora(message);
  spinner.start();
  const executeRes = await fn(...args);
  spinner.succeed();
  return executeRes;
}

module.exports = {
  loading,
};
