import { createSlice } from "@reduxjs/toolkit"
import { AppState } from "../store"

export interface TemplateState {
  config: any
}

// Initial state
const initialState: TemplateState = {
  config: {}
}

// Actual Slice
export const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    // Action to set the authentication status
    setConfig(state, action) {
      state.config = action.payload
    },
  }
})

export const { setConfig } = settingSlice.actions

export const config = (state: AppState) => state.setting.config

export default settingSlice.reducer
