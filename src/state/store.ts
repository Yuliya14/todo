import {tasksReducer} from './tasks-reducer';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {todolistsReducer} from "./todolist-reducer";
import thunk from "redux-thunk";
import {appReducer} from "./app-reducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;