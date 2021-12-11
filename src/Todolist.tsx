import React, {ChangeEvent, MouseEvent, KeyboardEvent, useState} from "react";
import {filterTaskType, taskType} from "./App";

type TodolistPropsType = {
    title: string
    tasks: taskType[]
    removeTask: (taskId: string) => void
    setFilter: (filter: filterTaskType) => void
    addTask: (title: string) => void
}
export const Todolist = (props: TodolistPropsType) => {
    const [title, setTitle] = useState("")

    const setFilterAll = (e:MouseEvent<HTMLButtonElement>) =>  props.setFilter('all')
    const setFilterActive = (e:MouseEvent<HTMLButtonElement>) => props.setFilter('active')
    const setFilterCompleted = (e:MouseEvent<HTMLButtonElement>) => props.setFilter('completed')

    const addTask = (e: MouseEvent<HTMLButtonElement>) => {
        props.addTask(title)
        setTitle('')
    }
    const setTitleTask = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.charCode === 13) {
            props.addTask(title)
            setTitle('')
        }
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title} onChange = {setTitleTask} onKeyPress={onKeyPressHandler}/>
            <button onClick={addTask}>+</button>
        </div>
        <ul>{props.tasks.map(t => {

            const removeTask = (e: MouseEvent<HTMLButtonElement>) => {
                props.removeTask(t.id)
            }
            return <div key={t.id}>
                <li>
                    <button onClick={removeTask}>X</button>
                    <input type='checkbox' checked={t.completed}/><span>{t.title}</span></li>
            </div>
        })}
        </ul>
        <div>
            <button onClick = {setFilterAll}>All</button>
            <button onClick = {setFilterActive}>Active</button>
            <button onClick = {setFilterCompleted}>Completed</button>
        </div>
    </div>
}