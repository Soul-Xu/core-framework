import { createSlice } from "@reduxjs/toolkit"
import { AppState } from "../store"

// Type for our state
export interface RecoveryState {
  recovery: {
    fdRestoreCode: string, // 恢复代码
    fdHasProblem: boolean, // 潜在问题
    fdRestoreDesc: string, // 恢复过程描述
    fdEffectEstimate: string, // 可用性影响初步评估
    fdFollowTeam: string, // 主要跟进团队
    fdFollowUser: string, // 可用性跟进人 
    fdAssistTeam: string, // 协助跟进团队
    fdRestoreTime: string, // 业务恢复时间
    fdEffectDuration: string, // 受影响时长
    fdUsabilityLevel: string, // 可用性定级
    fdEffectPercent: string, // 业务影响比例
    fdBearPercent: string, // 责任团队及承担比例
    fdEffectDesc: string // 业务影响概述
  }
}

// Initial state
const initialState: RecoveryState = {
  recovery: {
    fdRestoreCode: "", // 恢复代码
    fdHasProblem: false, // 潜在问题
    fdRestoreDesc: "", // 恢复过程描述
    fdEffectEstimate: "", // 可用性影响初步评估
    fdFollowTeam: "", // 主要跟进团队
    fdFollowUser: "", // 可用性跟进人 
    fdAssistTeam: "", // 协助跟进团队
    fdRestoreTime: "", // 业务恢复时间
    fdEffectDuration: "", // 受影响时长
    fdUsabilityLevel: "", // 可用性定级
    fdEffectPercent: "", // 业务影响比例
    fdBearPercent: "", // 责任团队及承担比例
    fdEffectDesc: "" // 业务影响概述
  }
}

// Actual Slice
export const recoverySlice = createSlice({
  name: "recovery",
  initialState,
  reducers: {
    // Action to set the authentication status
    setRecovery(state, action) {
      state.recovery = action.payload
    },
  }
})

export const { setRecovery } = recoverySlice.actions

export const recovery = (state: AppState) => state.recovery.recovery

export default recoverySlice.reducer
