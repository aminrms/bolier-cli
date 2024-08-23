import inquirer from "inquirer";

export const askTemplateSelection = async (templates) => {
  const questions = [
    {
      type: "list",
      name: "template",
      message: "Which template would you like to use?",
      choices: Object.keys(templates), // Choices are generated from the template keys
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

  return inquirer.prompt(questions);
};
