import React, {ChangeEvent, MouseEvent} from "react";
import {filterTaskType, taskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete, HighlightOff} from "@material-ui/icons";

type TodolistPropsType = {
    todolistId: string
    title: string
    tasks: taskType[]
    removeTask: (taskId: string, todolistId: string) => void
    filter: filterTaskType
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, completed: boolean, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    changeTodolistFilter: (filterValue: filterTaskType, todolistId: string) => void
    changeTodolistTitle: (newTitle: string, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}
export const Todolist = (props: TodolistPropsType) => {

    const removeTodolist = (e: MouseEvent<HTMLButtonElement>) => props.removeTodolist(props.todolistId)
    const setFilterAll = (e: MouseEvent<HTMLButtonElement>) => props.changeTodolistFilter('all', props.todolistId)
    const setFilterActive = (e: MouseEvent<HTMLButtonElement>) => props.changeTodolistFilter('active', props.todolistId)
    const setFilterCompleted = (e: MouseEvent<HTMLButtonElement>) => props.changeTodolistFilter('completed', props.todolistId)

    const addTask = (title: string) => {
        if (title.trim() !== "") {
            props.addTask(title, props.todolistId)
        }
    }
    const changeTodolistTitle =(newTitle: string) => {
        props.changeTodolistTitle(newTitle, props.todolistId)
    }
    return <div>
        <IconButton onClick={removeTodolist}>
            <Delete/>
        </IconButton>
        <EditableSpan title={props.title} onChange={changeTodolistTitle}/>

        <AddItemForm addItem={addTask}/>

        <ul style={{listStyleType: "none", padding: "0px"}}>{props.tasks.map(t => {
            const removeTask = (e: MouseEvent<HTMLButtonElement>) => {
                props.removeTask(t.id, props.todolistId)
            }
            const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                let currentTaskCompleted = e.currentTarget.checked
                props.changeTaskStatus(t.id, currentTaskCompleted, props.todolistId)
            }
            const changeTaskTitle = (newTitle:string) => {
                props.changeTaskTitle(t.id, newTitle, props.todolistId)
            }
            return <div key={t.id}>
                <li className={t.completed ? 'is-done' : ''}>
                    <IconButton onClick={removeTask}>
                        <HighlightOff/>
                    </IconButton>
                    <Checkbox
                        checked={t.completed}
                        onChange={changeTaskStatus}
                        color="secondary"
                    />
                    <EditableSpan title = {t.title} onChange={changeTaskTitle}/>
                </li>
            </div>
        })}
        </ul>
        <div>
            <Button style = {{margin: "3px"}} size={ 'small'} variant={props.filter === "all" ? "contained": "outlined"} color="default" onClick={setFilterAll}>All</Button>
            <Button style = {{margin: "3px"}} size={ 'small'} variant={props.filter === "active" ? "contained": "outlined"} color="inherit" onClick={setFilterActive}>Active</Button>
            <Button style = {{margin: "3px"}} size={ 'small'} variant={props.filter === "completed" ? "contained": "outlined"} color="secondary" onClick={setFilterCompleted}>Completed</Button>
        </div>
    </div>
}

