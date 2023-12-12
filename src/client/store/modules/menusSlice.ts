import { createSlice } from "@reduxjs/toolkit"
import { AppState } from "../store"

interface MenusState {
  tabsList: Array<any>,
  menusList: Array<any>,
  selectTabs: any,
  selectMenus: any
}

// Initial state
const initialState: MenusState = {
  tabsList: [], // 一级菜单列表
  menusList: [], // 二级菜单列表
  selectTabs: {}, // 当前选中的一级菜单
  selectMenus: {} // 当前选中的二级菜单
}

// Actual Slice
export const menusSlice = createSlice({
  name: "menus",
  initialState,
  reducers: {
    // Action to set the authentication status
    setTabsList(state, action) {
      state.tabsList = action.payload.tabsList
    },
    setMenusList(state, action) {
      state.menusList = action.payload.menusList
    },
    setSelectTabs(state, action) {
      state.selectTabs = action.payload.selectTabs
    },
    setSelectMenus(state, action) {
      state.selectMenus = action.payload.selectMenus
    },
  }
})

export const { setTabsList, setMenusList, setSelectTabs, setSelectMenus } = menusSlice.actions

export default menusSlice.reducer
