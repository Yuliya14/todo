import React, {useEffect} from 'react';
import './App.css';
import AppBar from '@material-ui/core/AppBar/AppBar';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import {Button, Container, IconButton, LinearProgress, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {initializeAppTC, requestStatusType} from "./state/app-reducer";
import {ErrorSnackbar} from "./common/ErrorSnackbar";
import {TofolistsList} from "./TofolistsList";
import {Login} from "./Login";
import {HashRouter, Navigate, Route, Routes} from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import {logoutTC} from "./state/auth-reducer";

function App() {
    const status = useSelector<AppRootStateType, requestStatusType>(store => store.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>(store => store.app.isInitialised)
    const isLoggetIn = useSelector<AppRootStateType, boolean>(store => store.auth.isLoggedIn)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [dispatch])

    const logout = () => {
        dispatch(logoutTC())
    }

    if (!isInitialized) {
        return <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress color="inherit"/>
        </div>
    }
    return (
        <HashRouter>
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
                        {isLoggetIn
                            ? <Button color="inherit" variant="outlined" onClick={logout}>Logout</Button>
                            : <Button color="inherit" variant="outlined">Login</Button>}
                    </Toolbar>
                </AppBar>
                {status === 'loading' && <LinearProgress color="secondary"/>}
                <Container fixed>
                    <Routes>
                        <Route path={'/'} element={<TofolistsList/>}/>
                        <Route path={'/login'} element={<Login/>}/>
                        <Route path={'/404'} element={<h1>404: PAGE NOT FOUND</h1>}/>
                        <Route path={'*'} element={<Navigate to={'/404'}/>}/>
                    </Routes>
                </Container>
                <ErrorSnackbar/>
            </div>
        </HashRouter>
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
