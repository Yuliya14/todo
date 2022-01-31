import {Dispatch} from "redux";
import {setAppStatusAC} from "./app-reducer";
import {authAPI, LoginParamsType} from "../api/TodolistsAPI";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

const initialState = {isLoggedIn: false}

export const authReducer = (state: initialStateType = initialState, action: actionsAuthType) => {
    switch (action.type) {
        case 'APP/SET-IS-LOGGED-IN':
        case 'APP/SET-IS-LOGGED_OUT':
            return {...state, isLoggedIn: action.value}
        default:
            return {...state}
    }
}
export const loginAC = (value: boolean) => {
    return {type: 'APP/SET-IS-LOGGED-IN', value} as const
}
export const logoutAC = (value: boolean) => {
    return {type: 'APP/SET-IS-LOGGED_OUT', value} as const
}
export const loginTC = (loginParams: LoginParamsType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(loginParams)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(loginAC(true))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => handleServerNetworkError(error, dispatch))
}
export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(logoutAC(false))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => handleServerNetworkError(error, dispatch))
}
type actionsAuthType = ReturnType<typeof loginAC> | ReturnType<typeof logoutAC>
type initialStateType = typeof initialState