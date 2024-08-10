import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface InitialStateTypes {
    isSidebarCollapsed: boolean;
    isDarkMode: boolean;
}

const initialState: InitialStateTypes = {
    isSidebarCollapsed: false,
    isDarkMode: false,
}
// determine state if sidebar is closed or dark mode is enabled 

export const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setIsSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
            state.isSidebarCollapsed = action.payload;
        },
        setIsDarkMode: (state, action: PayloadAction<boolean>) => {
            state.isDarkMode = action.payload;
        }
    }
}) //updates redux store state of sidebar 

export const { setIsSidebarCollapsed, setIsDarkMode} = globalSlice.actions;

export default globalSlice.reducer;