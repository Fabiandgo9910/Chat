import {configureStore} from '@reduxjs/toolkit'
import myUserReducer from './myUserSlice'
import usersReducer from './usersReducer'
import useIsOpenReducer from './isOpenReducer'


const store = configureStore({
    reducer:{
        myUser: myUserReducer,
        users: usersReducer,
        isOpen:useIsOpenReducer
    },
});
export default store;