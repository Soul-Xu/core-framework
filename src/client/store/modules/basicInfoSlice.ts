import { createSlice } from "@reduxjs/toolkit"
import { AppState } from "../store"

// Type for our state
export interface BasicState {
  basicInfo: {
    fdSubject: string, // 标题
    fdDesc: string, // 描述
    fdNo: string, // 事件编号
    fdAuthor: string, // 登记人
    fdInputTime: string, // 登记时间
    fdFindWay: string, // 发现渠道
    fdReportor: string // 报告人
  }
}

// Initial state
const initialState: BasicState = {
  basicInfo: {
    fdSubject: "", // 标题
    fdDesc: "", // 描述
    fdNo: "", // 事件编号
    fdAuthor: "", // 登记人
    fdInputTime: "", // 登记时间
    fdFindWay: "", // 发现渠道
    fdReportor: "" // 报告人
  }
}

// Actual Slice
export const basicInfoSlice = createSlice({
  name: "basicInfo",
  initialState,
  reducers: {
    // Action to set the authentication status
    setBasicInfo(state, action) {
      state.basicInfo = action.payload
    },
  }
})

export const { setBasicInfo } = basicInfoSlice.actions

export const basicInfo = (state: AppState) => state.basic.basicInfo

export default basicInfoSlice.reducer
