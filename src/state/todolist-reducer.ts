import {filterTaskType, todolistType, todolistTypeAPI} from "../App";
import {Dispatch} from "redux";
import {todolistsAPI} from "../api/TodolistsAPI";
import {requestStatusType, setAppStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: todolistType[] = []
const todolistsSlice = createSlice({
    name: 'todolists',
    initialState,
    reducers: {
        removeTodolistAC: (state, action: PayloadAction<{id: string}>) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index > -1) {
                state.splice(index, 1)
            }
        },
        addTodolistAC: (state, action: PayloadAction<{todolist: todolistType}>) => {
            state.unshift(action.payload.todolist)
        },
        changeTodolistTitleAC: (state, action: PayloadAction<{newTitle: string, id: string}>) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].title = action.payload.newTitle
        },
        changeTodolistFilterAC: (state, action: PayloadAction<{filter: filterTaskType, id: string}>) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].filter = action.payload.filter
        },
        setTodolistsAC: (state, action: PayloadAction<{todolists: todolistTypeAPI[]}>) => {
            return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        },
        changeTodolistEntityStatusAC: (state, action: PayloadAction<{id: string, entityStatus: requestStatusType}>) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].entityStatus = action.payload.entityStatus
        },
    }
})
export const todolistsReducer = todolistsSlice.reducer
export const {removeTodolistAC, addTodolistAC, changeTodolistTitleAC, changeTodolistFilterAC, setTodolistsAC, changeTodolistEntityStatusAC} = todolistsSlice.actions

//thunkCreator
export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({value: 'loading'}))
    todolistsAPI.getTodolists()
        .then(res => {
                dispatch(setTodolistsAC({todolists: res.data}))
                dispatch(setAppStatusAC({value: 'succeeded'}))
            }
        )
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}
export const deleteTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({value: 'loading'}))
    dispatch(changeTodolistEntityStatusAC({id: todolistId, entityStatus: 'loading'}))
    todolistsAPI.deleteTodolist(todolistId)
        .then(res => {
            dispatch(removeTodolistAC({id: todolistId}))
            dispatch(setAppStatusAC({value: 'succeeded'}))
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}
export const createTodolistTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({value: 'loading'}))
    todolistsAPI.createTodolist(title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTodolistAC({todolist: res.data.data.item}))
                dispatch(setAppStatusAC({value: 'succeeded'}))
            } else handleServerAppError(res.data, dispatch)
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}
export const changeTodolistTitleTC = (newTitle: string, id: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({value: 'loading'}))
    todolistsAPI.updateTodolist(id, newTitle)
        .then(res => {
            dispatch(changeTodolistTitleAC({newTitle: newTitle, id}))
            dispatch(setAppStatusAC({value: 'succeeded'}))
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}