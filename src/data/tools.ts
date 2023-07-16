import * as config from "../configs";

export const toolsPrompt = {
  type: "tree",
  name: "tools",
  loop: false,
  multiple: true,
  message: "Which tools do you want to use?",
  validate: (value: string | null) => !!value,
  tree: [
    {
      name: "🧑‍💻 | Improve Developer Experience",
      value: "",
      open: true,
      children: [
        {
          name: "Eslint + Prettier",
          value: config.eslintPrettier,
        },
      ],
    },
    {
      name: "🧪 | Tests",
      value: "",
      open: true,
      children: [
        {
          name: "Jest + React Testing Library",
          value: config.jest,
        },
        {
          name: "Cypress",
          value: config.cypress,
        },
      ],
    },
    {
      name: "🎨 | Styles",
      value: "",
      open: true,
      children: [
        {
          name: "Styled Components",
          value: config.styledComponents,
        },
        {
          name: "Tailwind CSS",
          value: config.tailwind,
        },
      ],
    },
    {
      name: "✨ | Others",
      value: "",
      open: true,
      children: [
        {
          name: "React Router Dom",
          value: "routes",
        },
      ],
    },
  ],
};
