import axios, {Axios, AxiosResponse} from 'axios';
import {todolistTypeAPI} from "../App";

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
        return instance.post<ResponseType<{item:todolistTypeAPI[]}>>('todo-lists', {title});
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title});
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`);
    },
}

export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>,
    fieldsErrors?: Array<string>,
    data: D
}