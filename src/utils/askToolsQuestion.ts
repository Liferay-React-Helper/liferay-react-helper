import inquirer from "inquirer";
import TreePrompt from "inquirer-tree-prompt";
import { WidgetDetails } from "../interfaces/WidgetDetails";
import { Dependencies } from "../interfaces/Dependencies";
import { Scripts } from "../interfaces/Scripts";
import { toolsPrompt } from "../data/tools";

type Tool = (widgetDetails: WidgetDetails) => Promise<Dependencies & Scripts>;

const { prompt, registerPrompt } = inquirer;

registerPrompt("tree", TreePrompt);

export const askToolsQuestion = async () => {
  const { tools } = await prompt<{ tools: Tool[] }>([toolsPrompt]);
  return { tools };
};
