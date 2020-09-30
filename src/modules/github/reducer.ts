import { createReducer } from "typesafe-actions";
import {
  asyncState,
  createAsyncReducer,
  transformToArray,
} from "../../lib/reducerUtils";
import { getUserProfileAsync } from "./actions";
import { GithubAction, GithubState } from "./types";

const initialState: GithubState = {
  userProfile: asyncState.initial(),
};

export default createReducer<GithubState, GithubAction>(
  initialState
).handleAction(
  transformToArray(getUserProfileAsync),
  createAsyncReducer(getUserProfileAsync, "userProfile")
);
