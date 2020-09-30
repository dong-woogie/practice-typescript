import { AsyncActionCreatorBuilder, PayloadAction } from "typesafe-actions";
import { put, call } from "redux-saga/effects";

const isPayloadAction = <P>(
  action: any
): action is PayloadAction<string, P> => {
  return action.payload !== undefined;
};

export default function <T1, P1, T2, P2, T3, P3>(
  asyncActionCreator: AsyncActionCreatorBuilder<
    [T1, [P1, undefined]],
    [T2, [P2, undefined]],
    [T3, [P3, undefined]]
  >,
  promiseCreator: ((payload: P1) => Promise<P2>) | (() => Promise<P2>)
) {
  const { request, success, failure } = asyncActionCreator;
  return function* (action: ReturnType<typeof request>) {
    try {
      const result = isPayloadAction<P1>(action)
        ? yield call(promiseCreator, action.payload)
        : yield call(promiseCreator);
      yield put(success(result));
    } catch (e) {
      yield put(failure(e));
    }
  };
}
