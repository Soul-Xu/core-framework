import { createSlice } from "@reduxjs/toolkit"
import { AppState } from "../store"

export interface AppsState {
  selectApps: any,
  appsList: Array<any>,
  appsConfig: {
    showCurrent: boolean,
    showMyFavor: boolean,
    showMine: boolean
  }
}

// Initial state
const initialState: AppsState = {
  selectApps: {},
  appsList: [],
  appsConfig: {
    showCurrent: true,
    showMyFavor: true,
    showMine: true
  }
}

// Actual Slice
export const appsSlice = createSlice({
  name: "apps",
  initialState,
  reducers: {
    // Action to set the authentication status
    setAppsConfig(state, action) {
      state.appsConfig = action.payload
    },
    setAppsList(state, action) {
      state.appsList = action.payload.appsList
    },
    setSelectApps(state, action) {
      state.selectApps = action.payload.selectApps
    },
  }
})

export const { setAppsConfig, setAppsList, setSelectApps } = appsSlice.actions

export default appsSlice.reducer
