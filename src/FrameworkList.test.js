import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import FrameworkList from "./FrameworkList";

afterEach(() => cleanup());

describe("Rendering the list with props", () => {
  //propsがない時にNo data !のテキストが表示されることを確認
  it("Should render No data ! when no data proped", () => {
    render(<FrameworkList />);
    expect(screen.getByText("No data !")).toBeInTheDocument();
  });

  //リストのアイテムが表示されているかテスト
  it("Should render list item correctly", () => {
    //テスト用のダミーデータ
    const dummyData = [
      {
        id: 1,
        item: "React dummy",
      },
      {
        id: 2,
        item: "Angular dummy",
      },
      {
        id: 3,
        item: "Vue dummy",
      },
    ];
    render(<FrameworkList frameworks={dummyData} />); //propsでダミーデータを渡す

    // レンダリングされたリストアイテムのテキストを取得し、配列をつくる
    const frameworkItems = screen
      .getAllByRole("listitem")
      .map((ele) => ele.textContent);

    //ダミーデータからテキストを取得して配列をつくる
    const dummyItems = dummyData.map((ele) => ele.item);

    expect(frameworkItems).toEqual(dummyItems); //上記で作成した配列を比較して表示されているか確認
    expect(screen.queryByText("No data !")).toBeNull(); //propsが存在する時にNo data !のテキストが表示されないことを確認
  });
});
