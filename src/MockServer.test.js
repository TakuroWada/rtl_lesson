import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { rest } from "msw";
import { setupServer } from "msw/node";
import MockServer from "./MockServer";

//モックサーバーを作成
const server = setupServer(
  rest.get("https://jsonplaceholder.typicode.com/users/1", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ username: "Bred dummy" }));
  })
);

//テストの一番最初に一回実行 / モックサーバーの起動
beforeAll(() => server.listen());

//テストケース毎に実行
afterEach(() => {
  server.resetHandlers();
  cleanup();
});

//テストの一番最後に実行 / モックサーバーの停止
afterAll(() => server.close());

//API取得のテスト
describe("Mocking API", () => {
  //Fetch成功時のテストケース
  it("[Fetch success]Should display fetched data correctly and button disable", async () => {
    render(<MockServer />);
    userEvent.click(screen.getByRole("button")); //ボタンクリック操作を再現
    expect(await screen.findByText("Bred dummy")).toBeInTheDocument(); //モックサーバーから取得したユーザー名が設定されているか確認
    expect(screen.getByRole("button")).toHaveAttribute("disabled"); //disabled属性が機能しているか確認
  });

  //Fetchエラーのテストケース
  it("[Fetch failure]Should display error msg, no render heading and button abled", async () => {
    //このケース内でのみモックサーバーのレスポンス内容を変更
    server.use(
      rest.get(
        "https://jsonplaceholder.typicode.com/users/1",
        (req, res, ctx) => {
          return res(ctx.status(404));
        }
      )
    );
    render(<MockServer />);
    userEvent.click(screen.getByRole("button")); //ボタンクリック操作を再現

    //エラーメッセージが表示されているか確認
    expect(await screen.findByTestId("error")).toHaveTextContent(
      "Fetching Failed !"
    );

    expect(screen.queryByRole("heading")).toBeNull(); //エラー時はh3タグが表示されていないことを確認
    expect(screen.getByRole("button")).not.toHaveAttribute(); //ボタンが有効化されていることを確認
  });
});
