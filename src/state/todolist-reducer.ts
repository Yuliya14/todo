import {filterTaskType, todolistType} from "../App";
import {v1} from "uuid";

type ActionsType = RemoveTodolistAT | AddTodolistAT | ChangeTodolistTitleAT | ChangeTodolistFilterAT

export type RemoveTodolistAT = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistAT = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
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

export const todolistsReducer = (state: todolistType[], action: ActionsType): todolistType[] => {
    switch (action.type){
        case 'REMOVE-TODOLIST':
            return [...state.filter(tl => tl.id !== action.id)]
        case 'ADD-TODOLIST':
            return [{id:action.todolistId, addedDate: "", order: 0, title: action.title, filter: 'all'},...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id? {...tl, title: action.newTitle}: tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id? {...tl, filter: action.filter}: tl)
        default: throw new Error("I don't understand this type")
    }
}
export const removeTodolistAC = (id: string): RemoveTodolistAT => {
    return {type: 'REMOVE-TODOLIST', id}
}
export const addTodolistAC = (title: string): AddTodolistAT => {
    return {type: 'ADD-TODOLIST', title, todolistId: v1()}
}
export const changeTodolistTitleAC = (newTitle: string, id: string): ChangeTodolistTitleAT => {
    return {type: 'CHANGE-TODOLIST-TITLE',newTitle, id}
}
export const changeTodolistFilterAC = (filter: filterTaskType, id: string): ChangeTodolistFilterAT => {
    return {type: 'CHANGE-TODOLIST-FILTER',filter, id}
}