import {tasksType} from "../App";
import {v1} from "uuid";
import {AddTodolistAT, RemoveTodolistAT, todolistId1, todolistId2} from "./todolist-reducer";

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
const initialState: tasksType = {
    [todolistId1]: [
        {
            id: v1(), description: "", title: "Learn React", completed: false, status: 1, priority: 1,
            startDate: "", deadline: "", todoListId: "", order: 1, addedDate: ""
        },
        {
            id: v1(), description: "", title: "Learn JS", completed: false, status: 1, priority: 1,
            startDate: "", deadline: "", todoListId: "", order: 1, addedDate: ""
        },
        {
            id: v1(), description: "", title: "HTML", completed: true, status: 1, priority: 1,
            startDate: "", deadline: "", todoListId: "", order: 1, addedDate: ""
        },
    ],
    [todolistId2]: [
        {
            id: v1(), description: "", title: "Test", completed: false, status: 1, priority: 1,
            startDate: "", deadline: "", todoListId: "", order: 1, addedDate: ""
        },
        {
            id: v1(), description: "", title: "GraphQL", completed: false, status: 1, priority: 1,
            startDate: "", deadline: "", todoListId: "", order: 1, addedDate: ""
        },
    ]
}

export const tasksReducer = (state = initialState, action: ActionsType): tasksType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const copyState = {...state}
            const todolistTasks = copyState[action.todolistId]
            copyState[action.todolistId] = todolistTasks.filter(t => t.id !== action.taskId)
            return copyState
        }
        case "ADD-TASK": {
            const copyState = {...state}
            const todolistTasks = copyState[action.todolistId]
            const newTask = {
                id: v1(), description: "", title: action.title, completed: false, status: 1, priority: 1,
                startDate: "", deadline: "", todoListId: "", order: 1, addedDate: ""
            }
            copyState[action.todolistId] = [newTask, ...todolistTasks]
            return copyState
        }
        case "CHANGE-TASK-STATUS": {
            const copyState = {...state}
            const todolistTasks = copyState[action.todolistId]
            copyState[action.todolistId] = todolistTasks.map(t => t.id === action.taskId ? {
                ...t,
                completed: action.completed
            } : t)
            return copyState
        }
        case "CHANGE-TASK-TITLE": {
            const copyState = {...state}
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
            const copyState = {...state}
            delete copyState[action.id]
            return copyState
        default:
            return state
    }
}
export const removeTaskAC = (todolistId: string, taskId: string): removeTaskAT => {
    return {type: 'REMOVE-TASK', todolistId, taskId} as const
}
export const addTaskAC = (todolistId: string, title: string): addTaskAT => {
    return {type: 'ADD-TASK', todolistId, title} as const
}
export const changeTaskStatusAC = (todolistId: string, taskId: string, completed: boolean): changeTaskStatusAT => {
    return {type: 'CHANGE-TASK-STATUS', todolistId, taskId, completed} as const
}
export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string): changeTaskTitleAT => {
    return {type: 'CHANGE-TASK-TITLE', todolistId, taskId, title} as const
}
export const addTodolistAC = (title: string) => {
    return {type: 'ADD-TODOLIST', title, todolistId: v1()} as const
}
