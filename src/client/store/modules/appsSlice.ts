import { createSlice } from "@reduxjs/toolkit"
import { AppState } from "../store"

export interface AppsState {
  appsConfig: {
    showCurrent: boolean,
    showMine: boolean
  }
}

// Initial state
const initialState: AppsState = {
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
  }
})

export const { setAppsConfig } = appsSlice.actions

export const appsConfig = (state: AppState) => state.apps.appsConfig

export default appsSlice.reducer
