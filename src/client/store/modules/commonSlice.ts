import { createSlice } from "@reduxjs/toolkit"
import { AppState } from "../store"

export interface CommonState {
  token: string,
  baseApi: string
}

// Initial state
const initialState: CommonState = {
  token: "",
  baseApi: ""
}

// Actual Slice
export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    // Action to set the authentication status
    setToken(state, action) {
      state.token = action.payload.token
    },
    setBaseApi(state, action) {
      state.baseApi = action.payload.baseApi
    },
  }
})

export const { setToken, setBaseApi } = commonSlice.actions

export const token = (state: AppState) => state.common.token

export default commonSlice.reducer
