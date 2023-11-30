import { createSlice } from "@reduxjs/toolkit"
import { AppState } from "../store"

export interface PermissionState {
  rolesList: Array<any>
  permissionList: Array<any>
}

// Initial state
const initialState: PermissionState = {
  rolesList: [],
  permissionList: []
}

// Actual Slice
export const permissionSlice = createSlice({
  name: "permission",
  initialState,
  reducers: {
    // Action to set the authentication status
    setRolesList(state, action) {
      state.rolesList = action.payload.rolesList
    },
    setPermissionList(state, action) {
      state.permissionList = action.payload.permissionList
    },
  }
})

export const { setRolesList, setPermissionList } = permissionSlice.actions

export default permissionSlice.reducer
