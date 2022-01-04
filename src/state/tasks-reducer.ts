import {tasksType, taskType} from "../App";
import {v1} from "uuid";
import {AddTodolistAT, RemoveTodolistAT, SetTodolistsAT} from "./todolist-reducer";
import {Dispatch} from "redux";
import {tasksAPI, API, TaskStatuses} from "../api/API";
import {AppRootStateType} from "./store";

type ActionsType = removeTaskAT | addTaskAT | changeTaskStatusAT | changeTaskTitleAT
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
type setTasksAT = {
    type: 'SET-TASKS'
    tasks: taskType[]
    todolistId: string
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
export const changeTaskStatusAC = (todolistId: string, taskId: string, completed: boolean): changeTaskStatusAT => {
    return {type: 'CHANGE-TASK-STATUS', todolistId, taskId, completed} as const
}
export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string): changeTaskTitleAT => {
    return {type: 'CHANGE-TASK-TITLE', todolistId, taskId, title} as const
}
export const addTodolistAC = (title: string): AddTodolistAT => {
    return {type: 'ADD-TODOLIST', title, todolistId: v1()} as const
}
export const setTasksAC = (tasks: taskType[], todolistId: string): setTasksAT => {
    return {type: 'SET-TASKS', tasks, todolistId}
}
//thunk creator
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    tasksAPI.getTasks(todolistId)
        .then(res => {
            const tasks = res.data.items
            dispatch(setTasksAC(tasks, todolistId))
        })
}
export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    tasksAPI.deleteTask(todolistId, taskId)
        .then(res => {
            dispatch(removeTaskAC(todolistId,taskId))
        })
}
export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    tasksAPI.addTask(todolistId, title)
        .then(res => {
            dispatch(addTaskAC(res.data.data.item))
        })
}
/*
export const updateStatusTaskTC = (taskId: string, todolistId: string, status: TaskStatuses) => (dispatch: Dispatch, getState: () => AppRootStateType) =>
{
    const allTasksFromState = getState().tasks;
    const tasksForCurrentTodolist = allTasksFromState[todolistId]
    const task = tasksForCurrentTodolist.find(t => {
        return t.id === taskId
    })
    if (task) {
        tasksAPI.updateTask(todolistId, taskId, {
            description: task.description,
            title: task.title,
            completed: task.completed,
            status: status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            id: task.id,
            todoListId: task.todoListId,
            order: task.order,
            addedDate: task.addedDate
        }).then(() => {
            const action = changeTaskStatusAC(taskId, status, todolistId)
            dispatch(action)
        })
    }

}*/
