import { createSlice } from "@reduxjs/toolkit"
import { AppState } from "../store"

export interface TemplateState {
  demo: string
}

// Initial state
const initialState: TemplateState = {
  demo: ""
}

// Actual Slice
export const templateSlice = createSlice({
  name: "template",
  initialState,
  reducers: {
    // Action to set the authentication status
    setTemplate(state, action) {
      state.demo = action.payload
    },
  }
})

export const { setTemplate } = templateSlice.actions

export const demo = (state: AppState) => state.template.demo

export default templateSlice.reducer
