import { createSlice } from "@reduxjs/toolkit"
import { AppState } from "../store"

// Type for our state
export interface EffectState {
  effect: {
    fdLegal: string, // 合法合规
    fdBusiness: string, // 公司业务
    fdItSystem: string, // 信息系统
    fdReputation: string, // 影响声誉
    fdOther: string // 其他
  }
}

// Initial state
const initialState: EffectState = {
  effect: {
    fdLegal: "", // 合法合规
    fdBusiness: "", // 公司业务
    fdItSystem: "", // 信息系统
    fdReputation: "", // 影响声誉
    fdOther: "" // 其他
  }
}

// Actual Slice
export const effectSlice = createSlice({
  name: "effect",
  initialState,
  reducers: {
    // Action to set the authentication status
    setEffect(state, action) {
      state.effect = action.payload
    },
  }
})

export const { setEffect } = effectSlice.actions

export const effect = (state: AppState) => state.effect.effect

export default effectSlice.reducer
