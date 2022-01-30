import {ResponseType} from "../api/TodolistsAPI";
import {actionsType, setAppErrorAC, setAppStatusAC} from "../state/app-reducer";
import {Dispatch} from "redux";

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
    if(data.messages.length){
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC("Some error"))
    }
    dispatch(setAppStatusAC('failed'))
}
export const handleServerNetworkError = (error: {message: string}, dispatch: ErrorUtilsDispatchType) => {
    dispatch(setAppErrorAC(error.message))
    dispatch(setAppStatusAC('failed'))
}
type ErrorUtilsDispatchType = Dispatch<actionsType>
