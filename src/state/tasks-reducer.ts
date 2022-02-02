import {tasksType, taskTypeAPI} from "../App";
import {Dispatch} from "redux";
import {tasksAPI, TaskStatuses, UpdateModelType} from "../api/TodolistsAPI";
import {AppRootStateType} from "./store";
import {requestStatusType, setAppStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from "./todolist-reducer";

const initialState: tasksType = {}

const tasksSlice = createSlice({
    name: "tasks",
    initialState: initialState,
    reducers: {
        removeTaskAC: (state, action: PayloadAction<{ todolistId: string, taskId: string }>) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        },
        addTaskAC: (state, action: PayloadAction<{ task: taskTypeAPI }>) => {
            state[action.payload.task.todoListId].unshift({...action.payload.task, entityStatus: 'idle'})
        },
        updateTaskAC: (state, action: PayloadAction<{ todolistId: string, taskId: string, domainModel: UpdateDomainModelType }>) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id !== action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.domainModel}
            }
        },
        setTasksAC: (state, action: PayloadAction<{ tasks: taskTypeAPI[], todolistId: string }>) => {
            state[action.payload.todolistId] = action.payload.tasks.map(t => ({...t, entityStatus: 'idle'}))
        },
        changeTaskEntityStatusAC: (state, action: PayloadAction<{ todolistId: string, taskId: string, entityStatus: requestStatusType }>) => {
            state[action.payload.todolistId] = state[action.payload.todolistId].map(t => t.id === action.payload.taskId
                ? {...t, entityStatus: action.payload.entityStatus} : t)
        },
    },
    extraReducers:(builder) => {
        builder.addCase(addTodolistAC, (state, action) => {
            state[action.payload.todolist.id] = []
        });
        builder.addCase(removeTodolistAC, (state, action) => {
            delete state[action.payload.id]
        });
        builder.addCase(setTodolistsAC, (state, action) => {
            action.payload.todolists.forEach(tl => state[tl.id] = [])
        });
    }
})

export const tasksReducer = tasksSlice.reducer
export const {removeTaskAC, addTaskAC, updateTaskAC, setTasksAC, changeTaskEntityStatusAC} = tasksSlice.actions

//thunk creator
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({value: 'loading'}))
    tasksAPI.getTasks(todolistId)
        .then(res => {
            dispatch(setTasksAC({tasks: res.data.items, todolistId: todolistId}))
            dispatch(setAppStatusAC({value: 'succeeded'}))
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}
export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({value: 'loading'}))
    dispatch(changeTaskEntityStatusAC({todolistId: todolistId, taskId: taskId, entityStatus: 'loading'}))
    tasksAPI.deleteTask(todolistId, taskId)
        .then(res => {
            dispatch(removeTaskAC({todolistId: todolistId, taskId: taskId}))
            dispatch(setAppStatusAC({value: 'succeeded'}))
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}
export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({value: 'loading'}))
    tasksAPI.addTask(todolistId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                let task = res.data.data.item;
                dispatch(addTaskAC({task}))
                dispatch(setAppStatusAC({value: 'succeeded'}))
            } else handleServerAppError(res.data, dispatch)
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
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

        dispatch(setAppStatusAC({value: 'loading'}))
        tasksAPI.updateTask(todolistId, taskId, apiModel)
            .then(res => {
                dispatch(updateTaskAC({todolistId, taskId, domainModel}))
                dispatch(setAppStatusAC({value: 'succeeded'}))
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch)
            })
    }
type UpdateDomainModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: number
    startDate?: string
    deadline?: string
}

