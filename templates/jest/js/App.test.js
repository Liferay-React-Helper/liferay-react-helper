import { render, screen } from "@testing-library/react";
import { App } from "./App";

const props = {
  portletNamespace: "",
  contextPath: "",
  portletElementId: "",
  configuration: {
    system: {},
    portletInstance: {},
  },
};

describe("App Component", () => {
  it("should render with a Hello World", () => {
    render(<App {...props} />);

    screen.getByText("Hello World by Liferay React Helper!");
  });
});
