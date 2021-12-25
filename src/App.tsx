import React from 'react';
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

    const removeTask = (taskId: string, todolistId: string) => {
        dispatch(removeTaskAC(todolistId, taskId))
    }
    const addTask = (title: string, todolistId: string) => {
        dispatch(addTaskAC(todolistId, title))
    }
    const changeTaskStatus = (taskId: string, completed: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC(todolistId, taskId, completed))
    }
    const changeTaskTitle = (taskId: string, newTitle: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(todolistId, taskId, newTitle))
    }

    const removeTodolist = (todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    }
    const changeFilterTodolist = (filterValue: filterTaskType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(filterValue, todolistId))
    }
    const addTodolist = (title: string) => {
        dispatch(addTodolistAC(title))
    }
    const changeTodolistTitle = (newTitle: string, todolistId: string) => {
        dispatch(changeTodolistTitleAC(newTitle, todolistId))
    }

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
                        let allTodolistTasks = tasks[t.id]
                        let filteredTasks: taskType[]
                        if (t.filter === 'all') filteredTasks = allTodolistTasks
                        else {
                            t.filter === 'active'
                                ? filteredTasks = allTodolistTasks.filter(t => !t.completed)
                                : filteredTasks = allTodolistTasks.filter(t => t.completed)
                        }
                        return <Grid item key={t.id}>
                            <Paper elevation={8} style={{padding: "10px"}}>
                                <Todolist key={t.id}
                                          todolistId={t.id}
                                          title={t.title}
                                          filter={t.filter}
                                          tasks={filteredTasks}
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
