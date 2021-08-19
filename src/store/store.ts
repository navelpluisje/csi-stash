import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { rootReducer } from '@store/reducers';
import { controllerApi } from '@store/controller.service';
import { adminControllerApi } from '@store/controller.admin.service';

const store = configureStore({
  reducer: {
    [controllerApi.reducerPath]: controllerApi.reducer,
    [adminControllerApi.reducerPath]: adminControllerApi.reducer,
    ...rootReducer,
  },
  middleware: [...getDefaultMiddleware()],
});

// @ts-ignore
if (process.env.NODE_ENV !== 'production' && module.hot) {
  // @ts-ignore
  module.hot.accept('./reducers', () => store.replaceReducer(rootReducer));
}

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
