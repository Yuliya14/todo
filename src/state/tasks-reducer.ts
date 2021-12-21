import {filterTaskType, tasksType, todolistType} from "../App";
import {v1} from "uuid";
import {AddTodolistAT, RemoveTodolistAT} from "./todolist-reducer";

type ActionsType = removeTaskAT | addTaskAT | changeTaskStatusAT | changeTaskTitleAT | AddTodolistAT | RemoveTodolistAT

type removeTaskAT = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}
type addTaskAT = {
    type: 'ADD-TASK'
    todolistId: string
    title: string
}
type changeTaskStatusAT = {
    type: 'CHANGE-TASK-STATUS'
    todolistId: string
    taskId: string
    completed: boolean
}
type changeTaskTitleAT = {
    type: 'CHANGE-TASK-TITLE'
    todolistId: string
    taskId: string
    title: string
}

export const tasksReducer = (state: tasksType, action: ActionsType): tasksType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const copyState = state
            const todolistTasks = copyState[action.todolistId]
            copyState[action.todolistId] = todolistTasks.filter(t => t.id !== action.taskId)
            return copyState
        }
        case "ADD-TASK": {
            const copyState = state
            const todolistTasks = copyState[action.todolistId]
            const newTask = {
                id: v1(), description: "", title: action.title, completed: false, status: 1, priority: 1,
                startDate: "", deadline: "", todoListId: "", order: 1, addedDate: ""
            }
            copyState[action.todolistId] = [newTask, ...todolistTasks]
            return copyState
        }
        case "CHANGE-TASK-STATUS": {
            const copyState = state
            const todolistTasks = copyState[action.todolistId]
            copyState[action.todolistId] = todolistTasks.map(t => t.id === action.taskId ? {
                ...t,
                completed: action.completed
            } : t)
            return copyState
        }
        case "CHANGE-TASK-TITLE": {
            const copyState = state
            const todolistTasks = copyState[action.todolistId]
            copyState[action.todolistId] = todolistTasks.map(t => t.id === action.taskId ? {
                ...t,
                title: action.title
            } : t)
            return copyState
        }
        case "ADD-TODOLIST":
            return {
                [action.todolistId]: [],
                ...state
            }
        case "REMOVE-TODOLIST":
            const copyState = state
            delete copyState[action.id]
            return copyState
        default:
            throw new Error("I don't understand this type")
    }
}
export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {type: 'REMOVE-TASK', todolistId, taskId} as const
}
export const addTaskAC = (todolistId: string, title: string) => {
    return {type: 'ADD-TASK', todolistId, title} as const
}
export const changeTaskStatusAC = (todolistId: string, taskId: string, completed: boolean) => {
    return {type: 'CHANGE-TASK-STATUS', todolistId, taskId, completed} as const
}
export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string) => {
    return {type: 'CHANGE-TASK-TITLE', todolistId, taskId, title} as const
}
export const addTodolistAC = (title: string) => {
    return {type: 'ADD-TODOLIST', title, todolistId: v1()} as const
}
