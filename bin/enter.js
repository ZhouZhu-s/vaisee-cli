#! /usr/bin/env node

const { Command } = require("commander");
const chalk = require("chalk");
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
    require("../lib/create.js")(projectName, cmd);
  });

/**
 * 监听 --help 指令
 */
program.on("--help", () => {
  console.log();
  console.log(
    `Run ${chalk.cyan(
      `${package.name} <command> --help`
    )} for detailed usage of given command.`
  );
});

program.parse();
