import { createSlice } from "@reduxjs/toolkit"
import { AppState } from "../store"

export interface PermissionState {
  rolesList: Array<any>
  permissionsList: Array<any>
  modulesList: Array<any>
  usersList: Array<any>
  deptsList: Array<any>
  selectDepts: Array<any>
  selectUsers: Array<any>
}

// Initial state
const initialState: PermissionState = {
  rolesList: [],
  permissionsList: [],
  modulesList: [],
  usersList: [],
  deptsList: [],
  selectDepts: [],
  selectUsers: []
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
    setSelectDepts(state, action) {
      state.selectDepts = action.payload.selectDepts
    },
    setSelectUsers(state, action) {
      state.selectUsers = action.payload.selectUsers
    },
  }
})

export const { setRolesList, setPermissionsList, setModulesList, setUsersList, setDeptsList, setSelectDepts, setSelectUsers } = permissionSlice.actions

export default permissionSlice.reducer
