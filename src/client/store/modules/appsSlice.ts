import { createSlice } from "@reduxjs/toolkit"
import { AppState } from "../store"

export interface AppsState {
  appsList: Array<any>,
  appsConfig: {
    showCurrent: boolean,
    showMine: boolean
  }
}

// Initial state
const initialState: AppsState = {
  appsList: [],
  appsConfig: {
    showCurrent: true,
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
  }
})

export const { setAppsConfig, setAppsList } = appsSlice.actions

export default appsSlice.reducer
