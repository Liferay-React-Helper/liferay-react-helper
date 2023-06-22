import inquirer from "inquirer";
import { WidgetDetails } from "../interfaces/WidgetDetails";
import { askToolsQuestion } from "./askToolsQuestion";
import { widgetPrompts } from "../data/widget";

const { prompt } = inquirer;

export const askWidgetQuestions = async () => {
  const widgetDetails = await prompt<WidgetDetails>(widgetPrompts);

  if (widgetDetails.addTools) {
    const { tools } = await askToolsQuestion();
    return { widgetDetails, tools };
  }

  return { widgetDetails, tools: [] };
};
