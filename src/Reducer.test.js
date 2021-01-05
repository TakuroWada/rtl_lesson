import reducer, {
  increment,
  incrementByAmount,
} from "../src/features/customCounter/customCounterSlice";

describe("Reducer of ReduxToolKit", () => {
  //icrementのテスト
  describe("increment action", () => {
    let initialState = {
      mode: 0,
      value: 1,
    };

    //mode1のケース
    it("Should increment by 1 with mode 0", () => {
      const action = { type: increment.type }; //actionを作成
      const state = reducer(initialState, action);
      expect(state.value).toEqual(2);
    });

    //mode2のケース
    it("Should increment by 100 with mode 1", () => {
      let initialState = {
        mode: 1,
        value: 1,
      };
      const action = { type: increment.type };
      const state = reducer(initialState, action);
      expect(state.value).toEqual(101);
    });

    //mode3のケース
    it("Should increment by 10000 with mode 1", () => {
      let initialState = {
        mode: 2,
        value: 1,
      };
      const action = { type: increment.type };
      const state = reducer(initialState, action);
      expect(state.value).toEqual(10001);
    });
  });

  //incrementByAmountのテスト
  describe("incrementByAmount action", () => {
    let initialState = {
      mode: 0,
      value: 1,
    };

    //mode0のケース
    it("Should increment by payload value with mode 0", () => {
      const action = { type: incrementByAmount.type, payload: 3 };
      const state = reducer(initialState, action);
      expect(state.value).toEqual(4);
    });

    //mode1のケース
    it("Should increment by 100  * payload value with mode 1", () => {
      let initialState = {
        mode: 1,
        value: 1,
      };
      const action = { type: incrementByAmount.type, payload: 3 };
      const state = reducer(initialState, action);
      expect(state.value).toEqual(301);
    });

    //mode2のケース
    it("Should increment by 10000  * payload value with mode 2", () => {
      let initialState = {
        mode: 2,
        value: 1,
      };
      const action = { type: incrementByAmount.type, payload: 3 };
      const state = reducer(initialState, action);
      expect(state.value).toEqual(30001);
    });
  });
});
