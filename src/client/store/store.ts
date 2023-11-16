import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import { createWrapper } from "next-redux-wrapper"
import { authSlice } from "./modules/authSlice"
import { loginSlice } from "./modules/loginSlice"
import { basicInfoSlice } from "./modules/basicInfoSlice"
import { handleInfoSlice } from "./modules/handleInfoSlice"
import { reasonSlice } from "./modules/reasonSlice"
import { recoverySlice } from "./modules/recoverySlice"
import { effectSlice } from "./modules/effectSlice"
import { attachmentSlice } from "./modules/attachmentSlice"
import { templateSlice } from "./modules/templateSlice"

const makeStore = () =>
  configureStore({
    reducer: {
      template: templateSlice.reducer,
      auth: authSlice.reducer,
      login: loginSlice.reducer,
      basic: basicInfoSlice.reducer,
      handle: handleInfoSlice.reducer,
      reason: reasonSlice.reducer,
      recovery: recoverySlice.reducer,
      effect: effectSlice.reducer,
      attachment: attachmentSlice.reducer
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
