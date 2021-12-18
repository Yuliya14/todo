import React, {MouseEvent} from "react";
import {filterTaskType, taskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

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

        <button onClick={removeTodolist}>X</button>
        <EditableSpan title={props.title} onChange={changeTodolistTitle}/>

        <AddItemForm addItem={addTask}/>

        <ul>{props.tasks.map(t => {

            const removeTask = (e: MouseEvent<HTMLButtonElement>) => {
                props.removeTask(t.id, props.todolistId)
            }
            const changeTaskStatus = (e: MouseEvent<HTMLInputElement>) => {
                let currentTaskCompleted = e.currentTarget.checked
                props.changeTaskStatus(t.id, currentTaskCompleted, props.todolistId)
            }
            const changeTaskTitle = (newTitle:string) => {
                props.changeTaskTitle(t.id, newTitle, props.todolistId)
            }
            return <div key={t.id}>
                <li className={t.completed ? 'is-done' : ''}>
                    <button onClick={removeTask}>X</button>
                    <input type='checkbox' checked={t.completed} onClick={changeTaskStatus}/>
                    <EditableSpan title = {t.title} onChange={changeTaskTitle}/>
                </li>
            </div>
        })}
        </ul>
        <div>
            <button onClick={setFilterAll} className={props.filter === 'all' ? 'active-filter' : ''}>All</button>
            <button onClick={setFilterActive} className={props.filter === 'active' ? 'active-filter' : ''}>Active</button>
            <button onClick={setFilterCompleted} className={props.filter === 'completed' ? 'active-filter' : ''}>Completed</button>
        </div>
    </div>
}

