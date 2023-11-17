import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import { createWrapper } from "next-redux-wrapper"
import { authSlice } from "./modules/authSlice"
import { loginSlice } from "./modules/loginSlice"
import { templateSlice } from "./modules/templateSlice"

const makeStore = () =>
  configureStore({
    reducer: {
      template: templateSlice.reducer,
      auth: authSlice.reducer,
      login: loginSlice.reducer
    },
    devTools: true
  })

export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore["getState"]>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>

export const wrapper = createWrapper<AppStore>(makeStore)
