import ora from "ora";
import { getRepos } from "../utils/git.js";

export async function listTemplate() {
  console.log("Available templates: ");
  const spinner = ora("Get boiler plates ... ");
  try {
    spinner.start();
    const data = await getRepos();
    console.log(JSON.stringify(data));
    spinner.succeed();
  } catch (err) {
    spinner.fail();
    console.error(chalk.red(err));
  }
}
