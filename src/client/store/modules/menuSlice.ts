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
  tab: string,
  curTab: tabItemsProps
}

// Initial state
const initialState: MenusState = {
  tab: "1",
  curTab: {
    key: "",
    label: ""
  }
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
    },
    setCurTab(state, action) {
      state.curTab = action.payload.curTab
    }
  }
})

export const { setTabs, setTab, setCurTab } = menuSlice.actions

export default menuSlice.reducer
