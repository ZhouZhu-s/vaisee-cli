const path = require("path");
const fs = require("fs-extra");
const Inquirer = require("inquirer");
const Creator = require("./Creator");
const { getVueTemplateBranches } = require("../api");
const { loading } = require("../utils");

/**
 * 获取分支
 * @returns branch 分支名称
 */
async function getBranches() {
  const branches = await getVueTemplateBranches();
  const branchNameList = branches.map((item) => item.name);
  const { branch } = await new Inquirer.prompt([
    {
      name: "branch",
      type: "list",
      message: "Please choose a template",
      choices: branchNameList,
    },
  ]);
  return branch;
}

/**
 * @returns Promise<boolean>
 */
async function chooseOverwrite() {
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
  return isOverwrite;
}

/**
 * @param projectName 项目名
 * @param options 创建项目选项
 */
module.exports = async function (projectName, options) {
  const cwd = process.cwd();
  const targetDirectory = path.join(cwd, projectName);
  const creator = new Creator(projectName, targetDirectory);

  if (fs.existsSync(targetDirectory)) {
    if (options.force) {
      await loading("Removing", fs.remove, targetDirectory);
      const branch = await getBranches();
      creator.create(branch);
    } else {
      const isOverwrite = await chooseOverwrite();
      if (isOverwrite) {
        await loading("Removing", fs.remove, targetDirectory);
        const branch = await getBranches();
        creator.create(branch);
      } else {
        console.log("Cancel");
        return;
      }
    }
  } else {
    const branch = await getBranches();
    creator.create(branch);
  }
};
