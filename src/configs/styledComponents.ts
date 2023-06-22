import { WidgetDetails } from "../interfaces/WidgetDetails";

export const styledComponents = async ({ isTypescript }: WidgetDetails) => {
  const tsDevDependencies = isTypescript ? ["@types/styled-components"] : [];

  return {
    dependencies: ["styled-components"],
    devDependencies: [...tsDevDependencies],
    scripts: [],
  };
};
