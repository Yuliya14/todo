import React, {MouseEvent} from "react";
import {filterTaskType, taskType} from "./App";

type TodolistPropsType = {
    title: string
    tasks: taskType[]
    removeTask: (taskId: string) => void
    setFilter: (filter: filterTaskType) => void
}
export const Todolist = (props: TodolistPropsType) => {

    const setFilterAll = (e:MouseEvent<HTMLButtonElement>) =>  props.setFilter('all')
    const setFilterActive = (e:MouseEvent<HTMLButtonElement>) => props.setFilter('active')
    const setFilterCompleted = (e:MouseEvent<HTMLButtonElement>) => props.setFilter('completed')

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
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