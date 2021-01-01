import React from "react";
import { render, screen } from "@testing-library/react";
import Render from "./Render";

describe("Rendering", () => {
  it("Should render all the elements correctly", () => {
    render(<Render />);
    //screen.debug();
    //screen.debug(screen.getByRole("heading"));

    //h1tagの中身が存在するかテスト
    expect(screen.getByRole("heading")).toBeTruthy();
  });
});
