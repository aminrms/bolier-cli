import inquirer from "inquirer";
import { ExitPromptError } from "@inquirer/core";

export const askTemplateSelection = async (templates) => {
  const questions = [
    {
      type: "list",
      name: "template",
      message: "Which template would you like to use?",
      choices: Object.keys(templates),
    },
    {
      type: "input",
      name: "projectName",
      message: "Enter the project name:",
      validate: (input) =>
        input?.trim() === "."
          ? "Project name cannot be '.' "
          : input !== ""
          ? true
          : "Project name cannot be empty",
    },
  ];

  try {
    const answers = await inquirer.prompt(questions);
    return answers;
  } catch (err) {
    if (err instanceof ExitPromptError) {
      // console.error("Prompt was closed by the user.");
      process.exit(1);
    } else {
      // console.error("An unexpected error occurred:", err);
      process.exit(1);
    }
  }
};
