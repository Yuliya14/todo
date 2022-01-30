import {tasksType, taskType, todolistType} from "../App";
import {AddTodolistAT, RemoveTodolistAT, SetTodolistsAT} from "./todolist-reducer";
import {Dispatch} from "redux";
import {tasksAPI, TaskStatuses, UpdateModelType} from "../api/TodolistsAPI";
import {AppRootStateType} from "./store";
import {setAppStatusAC} from "./app-reducer";

type ActionsType = removeTaskAT | addTaskAT | updateTaskAT
    | AddTodolistAT | RemoveTodolistAT | SetTodolistsAT | setTasksAT

type removeTaskAT = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}
type addTaskAT = {
    type: 'ADD-TASK'
    task: taskType
}
type updateTaskAT = {
    type: 'UPDATE-TASK'
    todolistId: string
    taskId: string
    domainModel: UpdateDomainModelType
}
type setTasksAT = {
    type: 'SET-TASKS'
    tasks: taskType[]
    todolistId: string
}
type UpdateDomainModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: number
    startDate?: string
    deadline?: string
}
const initialState: tasksType = {}

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
            const todolistTasks = copyState[action.task.todoListId]
            copyState[action.task.todoListId] = [action.task, ...todolistTasks]
            return copyState
        }
        case "UPDATE-TASK": {
            const copyState = {...state}
            const todolistTasks = copyState[action.todolistId]
            if (todolistTasks) {
                copyState[action.todolistId] = todolistTasks.map(t => t.id === action.taskId ? {
                    ...t, ...action.domainModel
                } : t)
            }
            return copyState
        }
        case "ADD-TODOLIST":
            return {
                [action.todolist.id]: [],
                ...state
            }
        case "REMOVE-TODOLIST": {
            const copyState = {...state}
            delete copyState[action.id]
            return copyState
        }
        case 'SET-TODOLISTS': {
            const copyState = {...state}
            action.todolists.forEach(tl => copyState[tl.id] = [])
            return copyState
        }
        case "SET-TASKS": {
            const copyState = {...state}
            copyState[action.todolistId] = action.tasks
            return copyState
        }
        default:
            return state
    }
}
//action creator
export const removeTaskAC = (todolistId: string, taskId: string): removeTaskAT => {
    return {type: 'REMOVE-TASK', todolistId, taskId} as const
}
export const addTaskAC = (task: taskType): addTaskAT => {
    return {type: 'ADD-TASK', task} as const
}
export const updateTaskAC = (todolistId: string, taskId: string, domainModel: UpdateDomainModelType): updateTaskAT => {
    return {type: 'UPDATE-TASK', todolistId, taskId, domainModel} as const
}
export const addTodolistAC = (todolist: todolistType): AddTodolistAT => {
    return {type: 'ADD-TODOLIST', todolist} as const
}
export const setTasksAC = (tasks: taskType[], todolistId: string): setTasksAT => {
    return {type: 'SET-TASKS', tasks, todolistId}
}
//thunk creator
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    tasksAPI.getTasks(todolistId)
        .then(res => {
            const tasks = res.data.items
            dispatch(setTasksAC(tasks, todolistId))
            dispatch(setAppStatusAC('succeeded'))
        })
}
export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    tasksAPI.deleteTask(todolistId, taskId)
        .then(res => {
            dispatch(removeTaskAC(todolistId, taskId))
            dispatch(setAppStatusAC('succeeded'))
        })
}
export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    tasksAPI.addTask(todolistId, title)
        .then(res => {
            dispatch(addTaskAC(res.data.data.item))
            dispatch(setAppStatusAC('succeeded'))
        })
}
export const updateTaskTC = (taskId: string, todolistId: string, domainModel: UpdateDomainModelType) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const allTasksFromState = getState().tasks;
        const tasksForCurrentTodolist = allTasksFromState[todolistId]
        const task = tasksForCurrentTodolist.find(t => t.id === taskId)

        if (!task) {
            console.warn("task not found")
            return
        }
        const apiModel: UpdateModelType = {
            status: task.status,
            title: task.title,
            startDate: task.startDate,
            priority: task.priority,
            description: task.description,
            deadline: task.deadline,
                ...domainModel
        }

        dispatch(setAppStatusAC('loading'))
        tasksAPI.updateTask(todolistId, taskId, apiModel)
            .then(res => {
                dispatch(updateTaskAC(todolistId, taskId, domainModel))
                dispatch(setAppStatusAC('succeeded'))
            })
    }
