import { createSlice } from "@reduxjs/toolkit"
import { AppState } from "../store"

// Type for our state
export interface ReasonState {
  reason: {
    fdReasonType: string, // 原因分类
    fdWellDone: string, // 做得好及幸运的地方
    fdReason: string, // 触发条件及原因分析
  }
}

// Initial state
const initialState: ReasonState = {
  reason: {
    fdReasonType: "", // 原因分类
    fdWellDone: "", // 做得好及幸运的地方
    fdReason: "", // 触发条件及原因分析
  }
}

// Actual Slice
export const reasonSlice = createSlice({
  name: "reason",
  initialState,
  reducers: {
    // Action to set the authentication status
    setReason(state, action) {
      state.reason = action.payload
    },
  }
})

export const { setReason } = reasonSlice.actions

export const reason = (state: AppState) => state.reason.reason

export default reasonSlice.reducer
