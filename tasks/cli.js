const inquirer = require("inquirer");
const sendgridSync = require("./sendgridsync");

// Add tasks here to populate in the CLI
const tasks = [
  {
    name: "Sendgrid Sync",
    value: sendgridSync
  },
  {
    name: "Dummy Task",
    value: () => {
      console.log("You ran the dummy task in:", process.env.NODE_ENV);
    }
  }
];

const taskQuestion = {
  name: "Task",
  type: "list",
  message: "Select a Task",
  choices: tasks
};

// Add Environments here to populate in the CLI
const environmentQuestion = {
  name: "Environment",
  type: "list",
  message: "Select an Environment",
  choices: ["development", "production"]
};

inquirer.prompt([taskQuestion, environmentQuestion]).then(answers => {
  process.env.NODE_ENV = answers.Environment;

  answers.Task();
});
