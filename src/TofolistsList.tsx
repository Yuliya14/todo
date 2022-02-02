import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import React, {useCallback, useEffect} from "react";
import {addTaskTC, deleteTaskTC, updateTaskTC} from "./state/tasks-reducer";
import {TaskStatuses} from "./api/TodolistsAPI";
import {
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    createTodolistTC,
    deleteTodolistTC, fetchTodolistsTC
} from "./state/todolist-reducer";
import {Grid, Paper} from "@material-ui/core";
import {Todolist} from "./Todolist";
import {filterTaskType, tasksType, todolistType} from "./App";
import {AddItemForm} from "./common/AddItemForm";
import {Navigate} from "react-router-dom";

export const TofolistsList = () => {

    const todolists = useSelector<AppRootStateType, todolistType[]>(store => store.todolists)
    const tasks = useSelector<AppRootStateType, tasksType>(store => store.tasks)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(store => store.auth.isLoggedIn)
    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(fetchTodolistsTC())
  }, [dispatch])

    const removeTask = useCallback((taskId: string, todolistId: string) => {
        dispatch(deleteTaskTC(todolistId, taskId))
    }, [dispatch])
    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskTC(todolistId, title))
    }, [dispatch])
    const changeTaskStatus = useCallback((taskId: string, status: TaskStatuses, todolistId: string) => {
        dispatch(updateTaskTC(taskId, todolistId, {status}))
    }, [dispatch])
    const changeTaskTitle = useCallback((taskId: string, newTitle: string, todolistId: string) => {
        dispatch(updateTaskTC(taskId, todolistId, {title: newTitle}))
    }, [dispatch])
    const addTodolist = useCallback((title: string) => {
        dispatch(createTodolistTC(title))
    }, [dispatch])
    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(deleteTodolistTC(todolistId))
    }, [dispatch])
    const changeFilterTodolist = useCallback((filterValue: filterTaskType, todolistId: string) => {
        dispatch(changeTodolistFilterAC({filter: filterValue, id: todolistId}))
    }, [dispatch])
    const changeTodolistTitle = useCallback((newTitle: string, todolistId: string) => {
        dispatch(changeTodolistTitleTC(newTitle, todolistId))
    }, [dispatch])

    if(!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }
    return <Grid container  spacing={5}>
        <Grid container style={{padding: "30px 0px"}}>
            <AddItemForm addItem={addTodolist}/>
        </Grid>
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
                              entityStatus={t.entityStatus}
                    />
                </Paper>
            </Grid>
        })}
    </Grid>
}