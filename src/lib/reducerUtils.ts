import { AnyAsyncActionCreator } from "./typeUtils";
import { AnyAction } from "redux";
import { getType } from "typesafe-actions";

export type AsyncState<D, E = any> = {
  data: D | null;
  error: E | null;
  loading: boolean;
};

export const asyncState = {
  initial: <D, E>(initialData?: D): AsyncState<D, E> => ({
    loading: false,
    data: initialData || null,
    error: null,
  }),
  loading: <D, E>(data?: D): AsyncState<D, E> => ({
    loading: true,
    data: data || null,
    error: null,
  }),
  success: <D, E>(data: D): AsyncState<D, E> => ({
    loading: false,
    data,
    error: null,
  }),
  error: <D, E>(error: E): AsyncState<D, E> => ({
    loading: false,
    data: null,
    error,
  }),
};

export function createAsyncReducer<
  S,
  AC extends AnyAsyncActionCreator,
  K extends keyof S
>(asyncActionCreator: AC, key: K) {
  return (state: S, action: AnyAction) => {
    const [request, success, failure] = [
      asyncActionCreator.request,
      asyncActionCreator.success,
      asyncActionCreator.failure,
    ].map(getType);
    switch (action.type) {
      case request:
        return {
          ...state,
          [key]: asyncState.loading(),
        };
      case success:
        return {
          ...state,
          [key]: asyncState.success(action.payload),
        };
      case failure:
        return {
          ...state,
          [key]: asyncState.error(action.payload),
        };
      default:
        return state;
    }
  };
}

export const transformToArray = <AC extends AnyAsyncActionCreator>(
  asyncActionCreator: AC
) => {
  const { request, success, failure } = asyncActionCreator;
  return [request, success, failure];
};
