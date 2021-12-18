import React, {MouseEvent} from "react";
import {filterTaskType, taskType} from "./App";
import {AddItemForm} from "./AddItemForm";

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

    const removeTodolist = (e: MouseEvent<HTMLButtonElement>) => props.removeTodolist(props.todolistId)
    const setFilterAll = (e: MouseEvent<HTMLButtonElement>) => props.changeTodolistFilter('all', props.todolistId)
    const setFilterActive = (e: MouseEvent<HTMLButtonElement>) => props.changeTodolistFilter('active', props.todolistId)
    const setFilterCompleted = (e: MouseEvent<HTMLButtonElement>) => props.changeTodolistFilter('completed', props.todolistId)

    const addTask = (title: string) => {
        if (title.trim() !== "") {
            props.addTask(title, props.todolistId)
        }
    }
    return <div>

        <button onClick={removeTodolist}>X</button>
        <span>{props.title}</span>

        <AddItemForm addItem={addTask}/>

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
