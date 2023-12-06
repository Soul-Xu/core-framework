import { createSlice } from "@reduxjs/toolkit"
import { AppState } from "../store"

export interface PermissionState {
  rolesList: Array<any>
  permissionsList: Array<any>
  modulesList: Array<any>
  usersList: Array<any>
  deptsList: Array<any>
}

// Initial state
const initialState: PermissionState = {
  rolesList: [],
  permissionsList: [],
  modulesList: [],
  usersList: [],
  deptsList: []
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
    setPermissionsList(state, action) {
      state.permissionsList = action.payload.permissionsList
    },
    setModulesList(state, action) {
      state.modulesList = action.payload.modulesList
    },
    setUsersList(state, action) {
      state.usersList = action.payload.usersList
    },
    setDeptsList(state, action) {
      state.deptsList = action.payload.deptsList
    },
  }
})

export const { setRolesList, setPermissionsList, setModulesList, setUsersList, setDeptsList } = permissionSlice.actions

export default permissionSlice.reducer
