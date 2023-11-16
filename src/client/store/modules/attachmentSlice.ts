import { createSlice } from "@reduxjs/toolkit"
import { AppState } from "../store"

// Type for our state
export interface AttachmentState {
  attachment: {
    fdFiles: Array<any>, // 文件上传
    fdImages: Array<any> // 图片上传
  }
}

// Initial state
const initialState: AttachmentState = {
  attachment: {
    fdFiles: [], // 文件上传
    fdImages: [] // 图片上传
  }
}

// Actual Slice
export const attachmentSlice = createSlice({
  name: "attachment",
  initialState,
  reducers: {
    // Action to set the authentication status
    setAttachment(state, action) {
      state.attachment = action.payload
    },
  }
})

export const { setAttachment } = attachmentSlice.actions

export const attachment = (state: AppState) => state.attachment.attachment

export default attachmentSlice.reducer
