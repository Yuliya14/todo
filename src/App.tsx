import React, {useCallback} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import AppBar from '@material-ui/core/AppBar/AppBar';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import {Button, Container, Grid, IconButton, Paper, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./state/todolist-reducer";

export type taskType = {
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
}

function App() {
    const todolists = useSelector<AppRootStateType, todolistType[]>(store => store.todolists)
    const tasks = useSelector<AppRootStateType, tasksType>(store => store.tasks)
    const dispatch = useDispatch()

    const removeTask = useCallback((taskId: string, todolistId: string) => {
        dispatch(removeTaskAC(todolistId, taskId))
    }, [dispatch])
    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskAC(todolistId, title))
    }, [dispatch])
    const changeTaskStatus = useCallback((taskId: string, completed: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC(todolistId, taskId, completed))
    }, [dispatch])
    const changeTaskTitle = useCallback((taskId: string, newTitle: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(todolistId, taskId, newTitle))
    }, [dispatch])

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    }, [dispatch])
    const changeFilterTodolist = useCallback((filterValue: filterTaskType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(filterValue, todolistId))
    }, [dispatch])
    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistAC(title))
    }, [dispatch])
    const changeTodolistTitle = useCallback((newTitle: string, todolistId: string) => {
        dispatch(changeTodolistTitleAC(newTitle, todolistId))
    }, [dispatch])

    return (
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
            <Container fixed>
                <Grid container style={{padding: "10px 0px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={5}>
                    {todolists.map(t => {
                        return <Grid item key={t.id}>
                            <Paper elevation={8} style={{padding: "10px"}}>
                                <Todolist key={t.id}
                                          todolistId={t.id}
                                          title={t.title}
                                          filter={t.filter}
                                          tasks={tasks}
                                          removeTodolist={removeTodolist}
                                          changeTodolistFilter={changeFilterTodolist}
                                          removeTask={removeTask}
                                          addTask={addTask}
                                          changeTaskStatus={changeTaskStatus}
                                          changeTaskTitle={changeTaskTitle}
                                          changeTodolistTitle={changeTodolistTitle}
                                />
                            </Paper>
                        </Grid>
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
