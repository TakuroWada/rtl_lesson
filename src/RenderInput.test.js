import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RenderInput from "./RenderInput";

//各describeで必ず実行する処理
afterEach(() => cleanup());

//レンダリングテスト
describe("Rendering", () => {
  it("Should reder all the elements correctly", () => {
    render(<RenderInput />);
    expect(screen.getByRole("button")).toBeTruthy();
    expect(screen.getByPlaceholderText("Enter")).toBeTruthy();
  });
});

//入力チェックテスト
describe("Input form onChange event", () => {
  it("Should update input value correctly", () => {
    render(<RenderInput />);
    const inputValue = screen.getByPlaceholderText("Enter"); //プレースホルダ名で取得
    userEvent.type(inputValue, "test"); //ユーザーが"test'という文字を入力する動作を再現
    expect(inputValue.value).toBe("test"); //valueが入力された文字で更新されているかテスト
  });
});

//アウトプット関数の呼び出しテスト
describe("Console button conditionally triggered", () => {
  //呼び出さないケース(文字入力がない時)
  it("Should not trigger output function", () => {
    const outputConsole = jest.fn(); //モック関数
    render(<RenderInput outputConsole={outputConsole} />); //モック関数をprpsで渡す
    userEvent.click(screen.getByRole("button")); //ユーザーがボタンをクリックする動作を再現
    expect(outputConsole).not.toHaveBeenCalled(); //クリック時に関数が呼び出されていないかテスト
  });

  //呼び出されるケース(文字入力がある場合)
  it("Should trigger output function", () => {
    const outputConsole = jest.fn(); //モック関数
    render(<RenderInput outputConsole={outputConsole} />); //モック関数をprpsで渡す
    const inputValue = screen.getByPlaceholderText("Enter");
    userEvent.type(inputValue, "test");
    userEvent.click(screen.getByRole("button"));
    expect(outputConsole).toHaveBeenCalledTimes(1); //クリック時に関数が１回呼び出されるかテスト
  });
});
