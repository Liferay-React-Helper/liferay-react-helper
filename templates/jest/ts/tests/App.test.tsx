import React from "react";
import { render } from "@testing-library/react";
import { App } from "../App";

const props = {
  portletNamespace: "",
  contextPath: "",
  portletElementId: "",
  configuration: {
    system: {},
    portletInstance: {},
  },
};

test("renders App component", () => {
  render(<App {...props} />);
});

test("renders App component with a title", () => {
  const { getByText } = render(<App {...props} />);

  const title = getByText("Hello World by Liferay React Helper!");

  expect(title).toBeInTheDocument();
});
