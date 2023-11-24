import { createSlice } from "@reduxjs/toolkit"
import { AppState } from "../store"

export interface menuItemsProps {
  key: string,
  label: string,
  icon?: Element
}


export interface tabItemsProps {
  key: string,
  label: string,
  menus?: Array<menuItemsProps>
}


export interface MenusState {
  tabs?: Array<tabItemsProps>,
  tab: string
}

// Initial state
const initialState: MenusState = {
  // tabs: [],
  tab: "1"
}

// Actual Slice
export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    // Action to set the authentication status
    setTabs(state, action) {
      state.tabs = action.payload
    },
    setTab(state, action) {
      state.tab = action.payload.tab
    }
  }
})

export const { setTabs, setTab } = menuSlice.actions

export const tabs = (state: AppState) => state.menu.tabs
export const tab = (state: AppState) => state.menu.tab

export default menuSlice.reducer
