import {Dispatch} from "redux";
import {authAPI} from "../api/TodolistsAPI";
import {loginAC} from "./auth-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

const initialState = {
    status: 'loading' as requestStatusType,
    error: null as string | null,
    isInitialised: false
}

export const appReducer = (state = initialState, action: actionsType): initialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-INITIALIZED':
            return {...state, isInitialised: action.isInitialized}
        default:
            return {...state}
    }
}

//action creator

export const setAppStatusAC = (status: requestStatusType) => {
    return {type: 'APP/SET-STATUS', status} as const
}
export const setAppErrorAC = (error: string | null) => {
    return {type: 'APP/SET-ERROR', error} as const
}
export const setInitialised = (isInitialized: boolean) => {
    return {type: 'APP/SET-INITIALIZED', isInitialized} as const
}
export const initializeAppTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.me()
        .then(res => {
            if(res.data.resultCode === 0) {
                dispatch(loginAC(true))
                dispatch(setInitialised(true))
                dispatch(setAppStatusAC('succeeded'))
            } else handleServerAppError(res.data, dispatch)
        })
        .catch(error => handleServerNetworkError(error, dispatch))
}
export type requestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type initialStateType = typeof initialState
export type actionsType = ReturnType<typeof setAppStatusAC> | ReturnType<typeof setAppErrorAC> | ReturnType<typeof setInitialised>
