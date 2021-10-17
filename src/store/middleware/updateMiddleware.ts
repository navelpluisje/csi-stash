import { ThunkAppDispatch } from '@hooks/redux';
import { AnyAction } from '@reduxjs/toolkit';
import type { RootState } from '@store/store';
// eslint-disable-next-line import/no-cycle
import { checkUpdate } from '@store/update/actions';

export interface MiddlewareAPI<S> {
  dispatch: ThunkAppDispatch
  getState(): S
}

export type Middleware<S> =
  (api: MiddlewareAPI<S>) =>
    (next: ThunkAppDispatch) =>
      (event: AnyAction) => ReturnType<ThunkAppDispatch>

export const updateMiddleware: Middleware<RootState> = (store) => (next) => (action) => {
  if (action.type === 'persist/REHYDRATE') {
    store.dispatch(checkUpdate());
  }
  next(action);
};
