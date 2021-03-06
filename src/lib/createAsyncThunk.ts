import { Dispatch } from "redux";
import { AnyAsyncActionCreator } from "./typeUtils";

export function createAsyncThunk<
  A extends AnyAsyncActionCreator,
  F extends (...params: any[]) => Promise<any>
>(asyncActionCreator: A, promiseCreator: F) {
  const { request, success, failure } = asyncActionCreator;
  type Params = Parameters<F>;
  return (...params: Params) => async (dispatch: Dispatch) => {
    dispatch(request());
    try {
      const payload = await promiseCreator(...params);
      dispatch(success(payload));
    } catch (e) {
      dispatch(failure(e));
    }
  };
}
