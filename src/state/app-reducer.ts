import {Dispatch} from "redux";
import {authAPI} from "../api/TodolistsAPI";
import {loginAC} from "./auth-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    status: 'loading' as requestStatusType,
    error: null as string | null,
    isInitialised: false
}
const appSlice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppStatusAC:
            (state, action: PayloadAction<{value: requestStatusType}>) => {
            state.status = action.payload.value
        },
        setAppErrorAC: (state, action: PayloadAction<{value: string | null}>) => {
            state.error = action.payload.value
        },
        setInitialised: (state, action: PayloadAction<{value: any | null}>) => {
            state.isInitialised = action.payload.value
        },
    }
})
export const appReducer = appSlice.reducer
export const setAppStatusAC = appSlice.actions.setAppStatusAC
export const setAppErrorAC = appSlice.actions.setAppErrorAC
export const setInitialised = appSlice.actions.setInitialised

export const initializeAppTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({value: 'loading'}))
    authAPI.me()
        .then(res => {
            if(res.data.resultCode === 0) {
                dispatch(loginAC({value: true}))
                dispatch(setAppStatusAC({value: 'succeeded'}))
            } else handleServerAppError(res.data, dispatch)
            dispatch(setInitialised({value: true}))
        })
        .catch(error => handleServerNetworkError(error, dispatch))
}

export type requestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'