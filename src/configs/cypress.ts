export const cypress = async () => {
  console.log("Instaling Cypress...");

  return {
    dependencies: [],
    devDependencies: ["cypress", "@testing-library/cypress"],
    scripts: [
      {
        key: "cy:open",
        value: "cypress open",
      },
      {
        key: "cy:run",
        value: "cypress run",
      },
    ],
  };
};
