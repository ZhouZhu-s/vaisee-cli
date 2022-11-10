const path = require("path");
const fs = require("fs-extra");
const Inquirer = require("inquirer");
const Creator = require("./Creator");

module.exports = async function (projectName, options) {
  console.log(projectName, options);
  const cwd = process.cwd();
  const targetDirectory = path.join(cwd, projectName);
  const creator = new Creator(projectName, targetDirectory);

  if (fs.existsSync(targetDirectory)) {
    if (options.force) {
      fs.remove(targetDirectory);
      creator.create();
    } else {
      let { isOverwrite } = await new Inquirer.prompt([
        {
          name: "isOverwrite",
          type: "list",
          message: "Target directory exists, Please choose an action",
          choices: [
            { name: "Overwrite", value: true },
            { name: "Cancel", value: false },
          ],
        },
      ]);
      if (isOverwrite) {
        console.log("\r\nRemoving");
        await fs.remove(targetDirectory);

      } else {
        console.log("Cancel");
        return;
      }
    }
  }
};
