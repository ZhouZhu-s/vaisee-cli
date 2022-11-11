const util = require("util");
const downloadGitRepo = require("download-git-repo");
const chalk = require("chalk");
const { loading } = require("../utils/index");

class Creator {
  constructor(name, target) {
    this.name = name;
    this.target = target;
    this.downloadGitRepo = util.promisify(downloadGitRepo);
  }

  async create(branch) {
    const templateUrl = `ZhouZhu-s/vue-template#${branch}`;
    await loading(
      "downloading template, please wait",
      this.downloadGitRepo,
      templateUrl,
      this.target
    );
    console.log(`\r\nSuccessfully created project ${chalk.cyan(this.name)}`);
    console.log(`\r\n  cd ${chalk.cyan(this.name)}`);
    console.log("  pnpm install\r");
    console.log("  pnpm dev\r");
  }
}

module.exports = Creator;
