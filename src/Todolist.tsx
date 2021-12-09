import React from "react";
import {taskType} from "./App";

type TodolistPropsType = {
    title:string
    tasks: taskType[]
}
export const Todolist = (props: TodolistPropsType) => {
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>{props.tasks.map(t => <li><input type='checkbox' checked={t.completed}/><span>{t.title}</span></li>)}
        </ul>
        <div>
            <button>All</button>
            <button>Active</button>
            <button>Completed</button>
        </div>
    </div>
}