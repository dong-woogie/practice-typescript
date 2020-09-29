import { Dispatch } from "redux";
import { getUserProfile } from "../../api/github";
import { getUserProfileAsync } from "./actions";

export const getUserProfileThunk = (username: string) => async (
  dispatch: Dispatch
) => {
  const { request, success, failure } = getUserProfileAsync;
  dispatch(request());
  try {
    const userProfile = await getUserProfile(username);
    dispatch(success(userProfile));
  } catch (e) {
    dispatch(failure(e));
  }
};
