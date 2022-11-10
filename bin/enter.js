#! /usr/bin/env node

const { Command } = require("commander");
const chalk = require("chalk");
const Inquirer = require("inquirer");
const ora = require("ora");
const package = require("../package.json");

const program = new Command();

/**
 * 配置版本号、名称
 */
program
  .name(`${package.name}`)
  .usage(`<command> [option]`)
  .version(`${package.version}`);

/**
 * 创建项目指令
 */
program
  .command("create <project-name>")
  .description("create a new project")
  .option("-f, --force", "overwrite target directory if it exists")
  .action((projectName, cmd) => {
    // console.log(projectName, cmd)
    require('../lib/create.js')(projectName, cmd)
  });

/**
 * 监听 --help 指令
 */
program.on('--help', () => {
  console.log();
  console.log(
    `Run ${chalk.cyan(
      `${package.name} <command> --help`
    )} for detailed usage of given command.`
  );
  console.log();
});

// console.log(`hello ${chalk.blue("world")}`);
// console.log(chalk.blue.bgRed.bold("Hello world!"));
// console.log(
//   chalk.green(
//     "I am a green line " +
//     chalk.blue.underline.bold("with a blue substring") +
//     " that becomes green again!"
//   )
// );

// new Inquirer.prompt([
//   {
//     name: "vue",
//     // 多选交互功能
//     // 单选将这里修改为 list 即可
//     type: "checkbox",
//     message: "Check the features needed for your project:",
//     choices: [
//       {
//         name: "Babel",
//         checked: true,
//       },
//       {
//         name: "TypeScript",
//       },
//       {
//         name: "Progressive Web App (PWA) Support",
//       },
//       {
//         name: "Router",
//       },
//     ],
//   },
// ]).then((data) => {
//   console.log(data);
// });

// // 定义一个loading
// const spinner = ora("Loading unicorns");
// // 启动loading
// spinner.start();
// setTimeout(() => {
//   spinner.color = "yellow";
//   spinner.text = "Loading rainbows";
// }, 1000);
// // loading 成功
// spinner.succeed();
// // loading 失败
// spinner.fail();

program.parse();
