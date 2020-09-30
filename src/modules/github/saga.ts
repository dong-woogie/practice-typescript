import { takeEvery } from "redux-saga/effects";
import { getUserProfile } from "../../api/github";
import createAsyncSaga from "../../lib/createAsyncSaga";
import { GET_USER_PROFILE, getUserProfileAsync } from "./actions";

const getUserSaga = createAsyncSaga(getUserProfileAsync, getUserProfile);

export function* githubSaga() {
  yield takeEvery(GET_USER_PROFILE, getUserSaga);
}
