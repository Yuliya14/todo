import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

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
export type filterTaskType = 'all' | 'active' | 'completed'

function App() {
    let [tasks, setTasks] = useState<taskType[]>([
        {
            id: v1(), description: "", title: "Learn React", completed: false, status: 1, priority: 1,
            startDate: "", deadline: "", todoListId: "", order: 1, addedDate: ""
        },
        {
            id: v1(), description: "", title: "Learn JS", completed: false, status: 1, priority: 1,
            startDate: "", deadline: "", todoListId: "", order: 1, addedDate: ""
        },
        {
            id: v1(), description: "", title: "HTML", completed: true, status: 1, priority: 1,
            startDate: "", deadline: "", todoListId: "", order: 1, addedDate: ""
        },
    ])
    const [filter, setFilter] = useState<filterTaskType>('all')

    let filteredTasks: taskType[]
    if (filter === 'all') filteredTasks = tasks
    else {
        filter === 'active'
            ? filteredTasks = [...tasks.filter(t => !t.completed)]
            : filteredTasks = [...tasks.filter(t => t.completed)]
    }

    const removeTask = (taskId: string) => {
        setTasks([...tasks.filter(t => t.id !== taskId)])
    }
    const addTask = (title: string) => {
        let newTask = {
            id: v1(), description: "", title, completed: false, status: 1, priority: 1,
            startDate: "", deadline: "", todoListId: "", order: 1, addedDate: ""
        }
        setTasks([newTask, ...tasks])
    }
    const changeTaskStatus = (taskId: string, completed: boolean) => {
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.completed = completed
            setTasks([...tasks])
        }
    }

    return (
        <div className="App">
            <Todolist title="Home"
                      tasks={filteredTasks}
                      removeTask={removeTask}
                      filter = {filter}
                      setFilter={setFilter}
                      addTask={addTask}
                      changeTaskStatus = {changeTaskStatus}
            />
        </div>
    );
}

export default App;
