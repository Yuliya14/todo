import React, {ChangeEvent, MouseEvent, KeyboardEvent, useState} from "react";
import {filterTaskType, taskType} from "./App";

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
}
export const Todolist = (props: TodolistPropsType) => {
    const [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const removeTodolist = (e: MouseEvent<HTMLButtonElement>) => props.removeTodolist(props.todolistId)
    const setFilterAll = (e: MouseEvent<HTMLButtonElement>) => props.changeTodolistFilter('all', props.todolistId)
    const setFilterActive = (e: MouseEvent<HTMLButtonElement>) => props.changeTodolistFilter('active', props.todolistId)
    const setFilterCompleted = (e: MouseEvent<HTMLButtonElement>) => props.changeTodolistFilter('completed', props.todolistId)

    const addTask = (e: MouseEvent<HTMLButtonElement>) => {
        if (title.trim() !== "") {
            props.addTask(title, props.todolistId)
            setTitle('')
        } else {
            setError('Field is required!')
        }

    }
    const setTitleTask = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13 && title.trim() !== "") {
            props.addTask(title, props.todolistId)
            setTitle('')
        } else if (e.charCode === 13 && title.trim() === ""){
            setError('Field is required!')
        }
    }

    return <div>

        <button onClick={removeTodolist}>X</button>
        <span>{props.title}</span>

        <div>
            <input className={error ? 'error' : ''} value={title} onChange={setTitleTask} onKeyPress={onKeyPressHandler}/>
            <button onClick={addTask}>+</button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
        <ul>{props.tasks.map(t => {

            const removeTask = (e: MouseEvent<HTMLButtonElement>) => {
                props.removeTask(t.id, props.todolistId)
            }
            const changeTaskStatus = (e: MouseEvent<HTMLInputElement>) => {
                let currentTaskCompleted = e.currentTarget.checked
                props.changeTaskStatus(t.id, currentTaskCompleted, props.todolistId)
            }
            return <div key={t.id}>
                <li>
                    <button onClick={removeTask}>X</button>
                    <input type='checkbox' checked={t.completed} onClick={changeTaskStatus}/>
                    <span className={t.completed ? 'is-done' : ''}>{t.title}</span></li>
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