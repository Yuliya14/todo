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
export const todolistId1 = v1()
export const todolistId2 = v1()
const initialState: todolistType[] = [
    {id: todolistId1, addedDate: "", order: 0, title: "Home", filter: 'all'},
    {id: todolistId2, addedDate: "", order: 0, title: "Work", filter: 'all'},
]

export const todolistsReducer = (state = initialState, action: ActionsType): todolistType[] => {
    switch (action.type){
        case 'REMOVE-TODOLIST':
            return [...state.filter(tl => tl.id !== action.id)]
        case 'ADD-TODOLIST':
            return [{id:action.todolistId, addedDate: "", order: 0, title: action.title, filter: 'all'},...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id? {...tl, title: action.newTitle}: tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id? {...tl, filter: action.filter}: tl)
        default:
            return state
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