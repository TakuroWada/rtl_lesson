import reducer, {
  fetchDummy,
} from "../src/features/customCounter/customCounterSlice";

//extraReducersのテスト
describe("extraReducers", () => {
  const initialState = {
    mode: 0,
    value: 0,
  };
  //fulfilled時
  it("Should output 100 + payload when fulfilled", () => {
    const action = { type: fetchDummy.fulfilled.type, payload: 5 };
    const state = reducer(initialState, action);
    expect(state.value).toEqual(105);
  });

  //rejected時
  it("Should output 100 - payload when rejected", () => {
    const action = { type: fetchDummy.rejected.type, payload: 5 };
    const state = reducer(initialState, action);
    expect(state.value).toEqual(95);
  });
});
