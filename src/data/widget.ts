import { validateWidgetName } from "../utils/validate";

export const widgetPrompts = [
  {
    type: "input",
    name: "widgetName",
    message: "What is your widget name?",
    default: "my-widget",
    validate: validateWidgetName,
  },
  {
    type: "confirm",
    name: "isTypescript",
    message: "Would you like to use TypeScript in your widget?",
    default: false,
  },
  {
    type: "confirm",
    name: "addTools",
    message: "Do you want to add additional tools?",
    default: false,
  },
];
