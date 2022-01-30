import {filterTaskType, todolistType, todolistTypeAPI} from "../App";
import {v1} from "uuid";
import {Dispatch} from "redux";
import {todolistsAPI} from "../api/TodolistsAPI";
import {setAppErrorAC, setAppStatusAC} from "./app-reducer";

type ActionsType = RemoveTodolistAT
    | AddTodolistAT
    | ChangeTodolistTitleAT
    | ChangeTodolistFilterAT
    | SetTodolistsAT

export type RemoveTodolistAT = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistAT = {
    type: 'ADD-TODOLIST'
    todolist: todolistTypeAPI
}
export type SetTodolistsAT = {
    type: "SET-TODOLISTS"
    todolists: todolistTypeAPI[]
}
type ChangeTodolistTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    newTitle: string
    id: string
}
type ChangeTodolistFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    filter: filterTaskType
    id: string
}

const initialState: todolistType[] = []

export const todolistsReducer = (state = initialState, action: ActionsType): todolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return [...state.filter(tl => tl.id !== action.id)]
        case 'ADD-TODOLIST':
            const newTodolist: todolistType = {...action.todolist, filter: "all"}
            return [newTodolist, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.newTitle} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case 'SET-TODOLISTS':
            return action.todolists.map(tl => ({...tl, filter: 'all'}))
        default:
            return state
    }
}
//actionCreator
export const removeTodolistAC = (id: string): RemoveTodolistAT => {
    return {type: 'REMOVE-TODOLIST', id}
}
export const addTodolistAC = (todolist: todolistType): AddTodolistAT => {
    return {type: 'ADD-TODOLIST', todolist}
}
export const changeTodolistTitleAC = (newTitle: string, id: string): ChangeTodolistTitleAT => {
    return {type: 'CHANGE-TODOLIST-TITLE', newTitle, id}
}
export const changeTodolistFilterAC = (filter: filterTaskType, id: string): ChangeTodolistFilterAT => {
    return {type: 'CHANGE-TODOLIST-FILTER', filter, id}
}
export const setTodolistsAC = (todolists: todolistTypeAPI[]) => {
    return {type: 'SET-TODOLISTS', todolists}
}
//thunkCreator
export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.getTodolists()
        .then(res => {
                dispatch(setTodolistsAC(res.data))
                dispatch(setAppStatusAC('succeeded'))
            }
        )
}
export const deleteTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.deleteTodolist(todolistId)
        .then(res => {
            dispatch(removeTodolistAC(todolistId))
            dispatch(setAppStatusAC('succeeded'))
        })
}
export const createTodolistTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.createTodolist(title)
        .then(res => {
            if(res.data.resultCode === 0) {
                dispatch(addTodolistAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                if(res.data.messages.length){
                    dispatch(setAppErrorAC(res.data.messages[0]))
                } else {
                    dispatch(setAppErrorAC("Some error"))
                }
                dispatch(setAppStatusAC("failed"))
            }
        })
}
export const changeTodolistTitleTC = (newTitle: string, id: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.updateTodolist(id, newTitle)
        .then(res => {
            dispatch(changeTodolistTitleAC(newTitle, id))
            dispatch(setAppStatusAC('succeeded'))
        })
}