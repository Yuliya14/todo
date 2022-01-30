import React, {MouseEvent, useCallback, useEffect} from "react";
import {filterTaskType, tasksType, taskType} from "./App";
import {AddItemForm} from "./common/AddItemForm";
import {EditableSpan} from "./common/EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";
import {fetchTasksTC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {TaskStatuses} from "./api/TodolistsAPI";
import {requestStatusType} from "./state/app-reducer";
import {AppRootStateType} from "./state/store";
import {changeTodolistEntityStatusAC, changeTodolistTitleTC} from "./state/todolist-reducer";

type TodolistPropsType = {
    todolistId: string
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    title: string
    tasks: tasksType
    filter: filterTaskType
    addTask: (title: string, todolistId: string) => void
    changeTodolistFilter: (filterValue: filterTaskType, todolistId: string) => void
    changeTodolistTitle: (newTitle: string, todolistId: string) => void
    entityStatus: requestStatusType
}
export const Todolist = React.memo((props: TodolistPropsType) => {
    const dispatch = useDispatch()

    useEffect( () => {
        dispatch(fetchTasksTC(props.todolistId))
    }, [])

    const removeTodolist = useCallback((e: MouseEvent<HTMLButtonElement>) => {
        props.removeTodolist(props.todolistId)
    }, [props])
    const setFilterAll = useCallback((e: MouseEvent<HTMLButtonElement>) => (props.changeTodolistFilter('all', props.todolistId)), [props])
    const setFilterActive = useCallback((e: MouseEvent<HTMLButtonElement>) => (props.changeTodolistFilter('active', props.todolistId)), [props])
    const setFilterCompleted = useCallback((e: MouseEvent<HTMLButtonElement>) => (props.changeTodolistFilter('completed', props.todolistId)), [props])

    const addTask = useCallback((title: string) => {
        if (title.trim() !== "") {
            props.addTask(title, props.todolistId)
        }
    },[props])
    const changeTodolistTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(newTitle, props.todolistId)
    }, [props])

    let allTodolistTasks = props.tasks[props.todolistId]
    let filteredTasks: taskType[]
    if (props.filter === 'all') filteredTasks = allTodolistTasks
    else {
        props.filter === 'active'
            ? filteredTasks = allTodolistTasks.filter((t: { completed: boolean; }) => !t.completed)
            : filteredTasks = allTodolistTasks.filter((t: { completed: boolean; }) => t.completed)
    }

    return <div>
        <IconButton onClick={removeTodolist} disabled = {props.entityStatus === 'loading'}>
            <Delete/>
        </IconButton>
        <EditableSpan title={props.title} onChange={changeTodolistTitle}/>

        <AddItemForm addItem={addTask} disabled = {props.entityStatus === 'loading'}/>

        <ul style={{listStyleType: "none", padding: "0px"}}>{
            filteredTasks.map(t => <Task key={t.id}
                                         changeTaskStatus={props.changeTaskStatus}
                                         changeTaskTitle={props.changeTaskTitle}
                                         todolistId={props.todolistId}
                                         removeTask={props.removeTask}
                                         task={t}/>)}
        </ul>
        <div>
            <Button style={{margin: "3px"}} size={'small'} variant={props.filter === "all" ? "contained" : "outlined"}
                    color="default" onClick={setFilterAll}>All</Button>
            <Button style={{margin: "3px"}} size={'small'}
                    variant={props.filter === "active" ? "contained" : "outlined"} color="inherit"
                    onClick={setFilterActive}>Active</Button>
            <Button style={{margin: "3px"}} size={'small'}
                    variant={props.filter === "completed" ? "contained" : "outlined"} color="secondary"
                    onClick={setFilterCompleted}>Completed</Button>
        </div>
    </div>
})

