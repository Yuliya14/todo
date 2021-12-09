import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

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
function App() {

    const tasks1: taskType[] = [
        {
            id: "1", description: "", title: "Input Values", completed: false, status: 1, priority: 1,
            startDate: "", deadline: "", todoListId: "", order: 1, addedDate: ""
        },
        {
            id: "2", description: "", title: "Change Status", completed: true, status: 1, priority: 1,
            startDate: "", deadline: "", todoListId: "", order: 1, addedDate: ""
        },
    ]
    const tasks2: taskType[] = [
        {
            id: "1", description: "", title: "Learn React", completed: false, status: 1, priority: 1,
            startDate: "", deadline: "", todoListId: "", order: 1, addedDate: ""
        },
        {
            id: "2", description: "", title: "Learn JS", completed: false, status: 1, priority: 1,
            startDate: "", deadline: "", todoListId: "", order: 1, addedDate: ""
        },
    ]
    return (
        <div className="App">
            <Todolist title="Work" tasks = {tasks1}/>
            <Todolist title="Home" tasks = {tasks2}/>
        </div>
    );
}

export default App;
