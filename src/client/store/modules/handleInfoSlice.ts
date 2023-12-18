import { createSlice } from "@reduxjs/toolkit"
import { AppState } from "../store"

// Type for our state
export interface HandleState {
  handleInfo: {
    fdStatus: string, // 状态
    fdEffectSystem: string, // 影响系统
    fdFindTime: string, // 发现时间
    fdProcessDept: string, // 处理组
    fdSubCate: string, // 子类
    fdHappendTime: string, // 发生时间
    fdProcessUser: string, // 处理人
    fdArea: string, // 区域
    fdReportTime: string, // 上报时间
    fdEffect: string, // 影响
    fdPriority: string, // 处理优先级
    fdFinishTime: string, // 处理完成时间
    fdUrgency: string, // 紧急程度
    fdsolveTime: string // 问题解决时间
  }
}

// Initial state
const initialState: HandleState = {
  handleInfo: {
    fdStatus: "", // 状态
    fdEffectSystem: "", // 影响系统
    fdFindTime: "", // 发现时间
    fdProcessDept: "", // 处理组
    fdSubCate: "", // 子类
    fdHappendTime: "", // 发生时间
    fdProcessUser: "", // 处理人
    fdArea: "", // 区域
    fdReportTime: "", // 上报时间
    fdEffect: "", // 影响
    fdPriority: "", // 处理优先级
    fdFinishTime: "", // 处理完成时间
    fdUrgency: "", // 紧急程度
    fdsolveTime: "" // 问题解决时间
  }
}

// Actual Slice
export const handleInfoSlice = createSlice({
  name: "handleInfo",
  initialState,
  reducers: {
    // Action to set the authentication status
    setHandleInfo(state, action) {
      state.handleInfo = action.payload
    },
  }
})

export const { setHandleInfo } = handleInfoSlice.actions

export const handleInfo = (state: AppState) => state.handle.handleInfo

export default handleInfoSlice.reducer
