import {ResponseType} from "../api/TodolistsAPI";
import { setAppErrorAC, setAppStatusAC} from "../state/app-reducer";
import {Dispatch} from "redux";

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch) => {
    if(data.messages.length){
        // @ts-ignore
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC({value: "Some error"}))
    }
    dispatch(setAppStatusAC({value: 'failed'}))
}
export const handleServerNetworkError = (error: {message: string}, dispatch: Dispatch) => {
    // @ts-ignore
    dispatch(setAppErrorAC(error.message))
    dispatch(setAppStatusAC({value: 'failed'}))
}
