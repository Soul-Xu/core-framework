import { createSlice } from "@reduxjs/toolkit"
import { AppState } from "../store"

export interface CommonState {
  cookie: string
}

// Initial state
const initialState: CommonState = {
  cookie: ""
}

// Actual Slice
export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    // Action to set the authentication status
    setCookie(state, action) {
      state.cookie = action.payload.cookie
    },
  }
})

export const { setCookie } = commonSlice.actions

export const cookie = (state: AppState) => state.common.cookie

export default commonSlice.reducer
