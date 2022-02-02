import {tasksReducer} from './tasks-reducer';
import {combineReducers} from 'redux';
import {todolistsReducer} from "./todolist-reducer";
import thunk from "redux-thunk";
import {appReducer} from "./app-reducer";
import {configureStore} from "@reduxjs/toolkit";
import {authReducer} from "./auth-reducer";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})

//export const store = createStore(rootReducer, applyMiddleware(thunk));
// store with redux toolkit
export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware  => getDefaultMiddleware().prepend(thunk),
})

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;