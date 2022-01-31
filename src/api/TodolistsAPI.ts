import axios, {AxiosResponse} from 'axios';
import {taskTypeAPI, todolistType, todolistTypeAPI} from "../App";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'fc2c077f-4801-47ba-97bc-ed7e7877df93'
    }
})
export const todolistsAPI = {
    getTodolists() {
        return instance.get<todolistTypeAPI[]>('todo-lists');
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{item:todolistType}>>('todo-lists', {title});
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title});
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`);
    },
}
export const tasksAPI = {
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    addTask(todolistId: string, title: string) {
        return instance.post<{ title: string }, AxiosResponse<ResponseType<{item: taskTypeAPI}>>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    updateTask(todolistId: string, taskId: string, model: UpdateModelType) {
        return instance.put<UpdateModelType, AxiosResponse<ResponseType<{item: taskTypeAPI}>>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    },
}
export const authAPI = {
    login(loginParams: LoginParamsType) {
        return instance.post<ResponseType<{item?: number}>>('auth/login', loginParams)
    },
    me(){
        return instance.get<ResponseType<meResponseType>>('auth/me')
    }
}
type meResponseType = {
    id: string
    email: string
    login: string
}
export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}
export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>,
    fieldsErrors?: Array<string>,
    data: D
}
type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: taskTypeAPI[]
}
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export type UpdateModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: number
    startDate: string
    deadline: string
}
