import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import UseEffectRender from "./UseEffectRender";

describe("useEffect rendering", () => {
  //非同期関数のテストなのでasync
  it("Should render only after async function resolved", async () => {
    render(<UseEffectRender />);
    expect(screen.queryByText(/I am/)).toBeNull(); //I amを含む文字列が存在しないことを確認
    expect(await screen.findByText(/I am/)).toBeInTheDocument(); //非同期処理の結果が反映するまでまってからテスト
  });
});
