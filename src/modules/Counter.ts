import { deprecated, createReducer, ActionType } from "typesafe-actions";
const { createStandardAction } = deprecated;

export const increase = createStandardAction("counter/INCREASE")();
export const decrease = createStandardAction("counter/DECREASE")();
export const increaseBy = createStandardAction("counter/INCREASE_BY")<number>();

type State = {
  count: number;
};

const initialState: State = {
  count: 0,
};

const actions = { increase, decrease, increaseBy };

type Action = ActionType<typeof actions>;

const counter = createReducer<State, Action>(initialState)
  .handleAction(increase, (state) => ({ count: state.count + 1 }))
  .handleAction(decrease, (state) => ({ count: state.count - 1 }))
  .handleAction(increaseBy, (state, action) => ({
    count: state.count + action.payload,
  }));

export default counter;
