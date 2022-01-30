import React, {useCallback, useEffect} from 'react';
import './App.css';
import {AddItemForm} from "./common/AddItemForm";
import AppBar from '@material-ui/core/AppBar/AppBar';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import {Button, Container, Grid, IconButton, LinearProgress, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {createTodolistTC, fetchTodolistsTC,} from "./state/todolist-reducer";
import {requestStatusType} from "./state/app-reducer";
import {ErrorSnackbar} from "./common/ErrorSnackbar";
import {TofolistsList} from "./TofolistsList";
import {Login} from "./Login";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";

function App() {
    const status = useSelector<AppRootStateType, requestStatusType>(store => store.app.status)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [dispatch])

    return (
        <BrowserRouter>
            <div>
                <AppBar position="static" style={{background: "black",}}>
                    <Toolbar style={{justifyContent: "space-between"}}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="menu">
                            <Menu/>
                        </IconButton>
                        <Typography>
                            Todolist
                        </Typography>
                        <Button color="inherit" variant="outlined">Login</Button>
                    </Toolbar>
                </AppBar>
                {status === 'loading' && <LinearProgress color="secondary"/>}
                <Container fixed>
                    <Routes>
                        <Route path={'/'} element={<TofolistsList/>}/>
                        <Route path={'/login'} element={<Login/>}/>
                        <Route path={'/404'} element ={<h1>404: PAGE NOT FOUND</h1>}/>
                        <Route path={'*'} element={<Navigate to={'/404'}/>}/>
                    </Routes>
                </Container>
                <ErrorSnackbar/>
            </div>
        </BrowserRouter>
    );
}

export type taskTypeAPI = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type taskType = taskTypeAPI & {
    entityStatus: requestStatusType
}
export type tasksType = {
    [key: string]: taskType[]
}
export type filterTaskType = 'all' | 'active' | 'completed'
export type todolistTypeAPI = {
    id: string
    addedDate: string
    order: number
    title: string
}
export type todolistType = todolistTypeAPI & {
    filter: filterTaskType
    entityStatus: requestStatusType
}

export default App;
