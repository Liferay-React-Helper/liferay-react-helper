import { askWidgetQuestions } from "./utils/askWidgetQuestions";
import { createWidget } from "./scripts/createWidget";
import { addDependencies } from "./scripts/addDependencies";
import { addScripts } from "./scripts/addScripts";

const main = async () => {
  const allDependencies = [];
  const allDevDependencies = [];
  const allScripts = [];

  const { widgetDetails, tools } = await askWidgetQuestions();

  const widget = await createWidget(widgetDetails);

  allDependencies.push(...widget.dependencies);
  allDevDependencies.push(...widget.devDependencies);
  allScripts.push(...widget.scripts);

  for (const tool of tools) {
    const { dependencies, devDependencies, scripts } = await tool(
      widgetDetails,
    );

    allDependencies.push(...dependencies);
    allDevDependencies.push(...devDependencies);
    allScripts.push(...scripts);
  }

  await addDependencies({
    dependencies: allDependencies,
    devDependencies: allDevDependencies,
  });

  await addScripts({
    scripts: allScripts,
  });
};

main();
