import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name:'',
    userId:'',
}
export const  myUserSlice = createSlice({
    name:"myUser",
    initialState ,
    reducers:{
        addMyUser:(state ,action)=>{
            const {name,userId} = action.payload;
            state.name = name;
            state.userId = userId;
        },
        changeUserid:(state, action)=>{
            state.userId = action.payload
        }
    }
})
export const {addMyUser,changeUserid} = myUserSlice.actions;
export default myUserSlice.reducer;