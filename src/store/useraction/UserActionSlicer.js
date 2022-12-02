import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    createModal : false,
    leftSide : false,
    isLoading : false
}

const UserAction = createSlice({
    name : 'useraction',
    initialState,
    reducers : {
        toggleUserModal : (state,action) => {
                state.createModal = !(state.createModal)
        },
        toggleLeftSide : (state,action) => {
            state.leftSide = !(state.leftSide)
        },
        setLoading : (state,action) => {
            state.isLoading = action.payload
        }
    }
})

export const {toggleUserModal,toggleLeftSide,setLoading} = UserAction.actions
export default UserAction.reducer