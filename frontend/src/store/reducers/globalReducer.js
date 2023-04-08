import { createSlice } from "@reduxjs/toolkit";


const globalReducer = createSlice({
    name: "global",
    initialState: {
        success: false,
    },
    reducers: {
        setSuccess: (state, action) => {
            state.success = action.payload;
        },
        clearMessage: (state) => {
            state.success = false;
        }
    }
});

export const { setSuccess, clearMessage } = globalReducer.actions;
export default globalReducer.reducer;