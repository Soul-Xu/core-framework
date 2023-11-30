import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import { createWrapper } from "next-redux-wrapper"
import { authSlice } from "./modules/authSlice"
import { loginSlice } from "./modules/loginSlice"
import { menuSlice } from "./modules/menuSlice"
import { appsSlice } from "./modules/appsSlice"
import { commonSlice } from "./modules/commonSlice"
import { permissionSlice } from "./modules/permissionSlice"
import { settingSlice } from "./modules/settingSlice"
import { templateSlice } from "./modules/templateSlice"

const makeStore = () =>
  configureStore({
    reducer: {
      template: templateSlice.reducer,
      auth: authSlice.reducer,
      login: loginSlice.reducer,
      common: commonSlice.reducer,
      permission: permissionSlice.reducer,
      menu: menuSlice.reducer,
      apps: appsSlice.reducer,
      setting: settingSlice.reducer
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
