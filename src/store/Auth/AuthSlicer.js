import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user : null,
    posts : [],
    userId : null,
    isLoadAuth : true
}

const AuthSlicer = createSlice({
    name : "Auth",
    initialState,
    reducers : {
        setUser : (state,action) => {
            state.user = action.payload
        },
        setPost : (state,action) => {
            state.posts = action.payload
        },
        setUserId : (state,action) => {
            state.userId = action.payload
        },
        setIsLoadAuth : (state,action) => {
            state.isLoadAuth = action.payload
        }
    }
})

export const {setUser,setPost,setUserId,setIsLoadAuth} = AuthSlicer.actions
export default AuthSlicer.reducer