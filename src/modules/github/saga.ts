import { takeEvery, put } from "redux-saga/effects";
import { getUserProfile, GithubProfile } from "../../api/github";
import { GET_USER_PROFILE, getUserProfileAsync } from "./actions";

function* getUserSaga(action: ReturnType<typeof getUserProfileAsync.request>) {
  try {
    const result: GithubProfile = yield getUserProfile(action.payload);
    yield put(getUserProfileAsync.success(result));
  } catch (e) {
    yield put(getUserProfileAsync.failure(e));
  }
}

export function* githubSaga() {
  yield takeEvery(GET_USER_PROFILE, getUserSaga);
}
