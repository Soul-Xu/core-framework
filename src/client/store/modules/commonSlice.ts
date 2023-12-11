import { createSlice } from "@reduxjs/toolkit"
import { AppState } from "../store"

export interface CommonState {
  token: string,
}

// Initial state
const initialState: CommonState = {
  token: "",
}

// Actual Slice
export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    // Action to set the authentication status
    setToken(state, action) {
      state.token = action.payload.token
    }
  }
})

export const { setToken } = commonSlice.actions
export const token = (state: AppState) => state.common.token

export default commonSlice.reducer
