import chalk from "chalk";
import simpleGit from "simple-git";
import ora from "ora";
import { askTemplateSelection } from "../utils/inquirer.js";
import fs from "fs/promises";
import path from "path";
import { exec } from "child_process";
import os from "os";
import { sleep } from "../utils/common.js";
const repos = {
  "nextjs-boilerplate":
    "https://github.com/aminrms/next-redux-tailwind-boilerplate.git",
  "flutter-boilerplate":
    "https://github.com/aminrms/download_service_flutter.git",
  "react-native-boilerplate":
    "https://github.com/aminrms/digikalaClone-app.git",
};
const isWindows = os.platform() === "win32";
async function openVsCode(pathname) {
  const open_vs_code_command = `${isWindows ? "code.cmd" : "code"} ${pathname}`;
  exec(open_vs_code_command, (error, stdout, stderr) => {
    if (error) {
      return;
    }
    if (stderr) {
      return;
    }
  });
  return await sleep(1000);
}

export async function useTemplate(template) {
  if (!template) {
    try {
      const answers = await askTemplateSelection(repos);
      if (!answers) {
        throw new Error("Boiler plate is not selected");
      }
      template = answers.template;
      const projectName = answers.projectName;
      const currentDirectory = process.cwd();
      const targetDirectory = path.join(currentDirectory, projectName);

      try {
        if (
          !(await fs
            .access(targetDirectory)
            .then(() => false)
            .catch(() => true))
        ) {
          console.error(
            chalk.red(`The directory '${targetDirectory}' already exists.`)
          );
          return;
        }

        await fs.mkdir(targetDirectory, { recursive: true }); // Create directory

        const repoUrl = repos[template];
        if (!repoUrl) {
          console.error(chalk.red(`Template ${template} not found.`));
          return;
        }

        const spinner = ora(`Cloning ${template}...`).start();
        const vscodeOpenSpinner = ora(`Open vscode...`);
        const git = simpleGit();

        await git.clone(repoUrl, targetDirectory);
        spinner.succeed(`Template ${template} cloned successfully.`);
        vscodeOpenSpinner.start();
        openVsCode(targetDirectory).then(() => {
          vscodeOpenSpinner.succeed(`Open vscode successfully.`);
        });
      } catch (err) {
        console.error(chalk.red(err.message));
      }
    } catch (err) {
    }
  }
}
