import {Dispatch} from "redux";
import {setAppStatusAC} from "./app-reducer";
import {authAPI, LoginParamsType} from "../api/TodolistsAPI";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {isLoggedIn: false}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        loginAC:(state, action: PayloadAction<{value: any}>) => {
            state.isLoggedIn = action.payload.value
        },
        logoutAC:(state, action: PayloadAction<{value: any}>) => {
            state.isLoggedIn = action.payload.value
        },
    }
})
export const authReducer = authSlice.reducer
export const loginAC = authSlice.actions.loginAC
export const logoutAC = authSlice.actions.logoutAC

export const loginTC = (loginParams: LoginParamsType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({value: 'loading'}))
    authAPI.login(loginParams)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(loginAC({value: true}))
                dispatch(setAppStatusAC({value: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => handleServerNetworkError(error, dispatch))
}
export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({value: 'loading'}))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(logoutAC({value: false}))
                dispatch(setAppStatusAC({value: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => handleServerNetworkError(error, dispatch))
}
