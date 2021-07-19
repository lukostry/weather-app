import React from "react";
import { render, screen } from "@testing-library/react";
import { Main } from "./Main";

describe("<Main /> component", () => {
  beforeEach(() => {
    render(<Main />);
  });
  it("should always render `Dashboard` text", () => {
    const linkElement = screen.getByText("Dashboard");
    expect(linkElement).toBeInTheDocument();
  });

  it("should always render search input", () => {
    const inputNode = screen.getByPlaceholderText("Search for city or place");
    expect(inputNode).toBeInTheDocument();
  });
});
