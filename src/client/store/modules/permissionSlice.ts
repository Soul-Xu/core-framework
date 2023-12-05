import { createSlice } from "@reduxjs/toolkit"
import { AppState } from "../store"

export interface PermissionState {
  rolesList: Array<any>
  permissionsList: Array<any>
}

// Initial state
const initialState: PermissionState = {
  rolesList: [],
  permissionsList: []
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
      state.permissionsList = action.payload.permissionsList
    },
  }
})

export const { setRolesList, setPermissionList } = permissionSlice.actions

export default permissionSlice.reducer
