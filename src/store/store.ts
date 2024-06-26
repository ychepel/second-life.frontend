import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { combineSlices, configureStore } from "@reduxjs/toolkit";

import { locationSlice } from "./redux/location/locationSlice";
import { categorySlice } from "./redux/category/categorySlice";
import { offersSlice } from "./redux/offers/offers";
import { offerSlice } from "./redux/offer/offer";
import { userSlice } from "./redux/user/userSlice";
import { categoryOneSlice } from "./redux/categoryOne/categoryOneSlice";
import { bidSlice } from "./redux/bid/bidSlice";
import { imageSlice } from "./redux/image/imageSlice";
import { bidsSlice } from "./redux/bids/bidsSlice";
import { rejectSlice } from "./redux/reject/rejectSlice";

// `combineSlices` automatically combines the reducers using
// their `reducerPath`s, therefore we no longer need to call `combineReducers`.
const rootReducer = combineSlices(
  locationSlice,
  categorySlice,
  categoryOneSlice,
  offerSlice,
  offersSlice,
  userSlice,
  bidSlice,
  imageSlice,
  bidsSlice,
  rejectSlice,
);
// Infer the `RootState` type from the root reducer
export type RootState = ReturnType<typeof rootReducer>;

// The store setup is wrapped in `makeStore` to allow reuse
// when setting up tests that need the same store config
export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
  });
  return store;
};

export const store = makeStore();

// Infer the type of `store`
export type AppStore = typeof store;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
