import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: '',
    userId: '',
}
export const isOpenSlice = createSlice({
    name: "isOpen",
    initialState,
    reducers: {
        addIsopen: (state, action) => {
            const { name, userId } = action.payload;
            state.name = name;
            state.userId = userId;
        },
        changeIsOpen: (state, action) => {
            const { name, userId } = action.payload;
            state.name = name;
            state.userId = userId;
        }
    }
})
export const { addIsopen, changeIsOpen } = isOpenSlice.actions;
export default isOpenSlice.reducer;