import React from "react";
import { render, screen } from "@testing-library/react";
import Render from "./Render";

describe("Rendering", () => {
  it("Should render all the elements correctly", () => {
    render(<Render />); //テストするコンポーネントを取得
    //screen.debug();
    //screen.debug(screen.getByRole("heading"));
    expect(screen.getByRole("heading")).toBeTruthy(); //h1が存在するか
    expect(screen.getByRole("textbox")).toBeTruthy(); //inputタグが存在するか
    expect(screen.getAllByRole("button")[0]).toBeTruthy(); //buttonタグの中身が存在するか(複数ある場合の１つ目)
    expect(screen.getAllByRole("button")[1]).toBeTruthy(); //buttonタグの中身が存在するか(複数ある場合の2つ目)
    expect(screen.getByText("test")).toBeTruthy(); // 指定したテキストが存在するか
    expect(screen.queryByText("nontext")).toBeNull(); //指定したテキストが存在しないか
    expect(screen.getByTestId("copyright")).toBeTruthy(); //指定したテストIDが存在するか
  });
});
