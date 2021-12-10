import React, {useState} from 'react';
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
export type filterTaskType = 'all' | 'active' | 'completed'

function App() {
    const [tasks, setTasks] = useState<taskType[]>([
        {
            id: "1", description: "", title: "Learn React", completed: false, status: 1, priority: 1,
            startDate: "", deadline: "", todoListId: "", order: 1, addedDate: ""
        },
        {
            id: "2", description: "", title: "Learn JS", completed: false, status: 1, priority: 1,
            startDate: "", deadline: "", todoListId: "", order: 1, addedDate: ""
        },
        {
            id: "3", description: "", title: "HTML", completed: true, status: 1, priority: 1,
            startDate: "", deadline: "", todoListId: "", order: 1, addedDate: ""
        },
    ])
    const [filter, setFilter] = useState<filterTaskType>('all')

    let filteredTasks: taskType[];
    filter === 'active'
        ? filteredTasks = [...tasks.filter(t => !t.completed)]
        : filteredTasks = [...tasks.filter(t => t.completed)]

    const removeTask = (taskId: string) => {
        setTasks([...tasks.filter(t => t.id !== taskId)])
    }

    return (
        <div className="App">
            <Todolist title="Home"
                      tasks={filteredTasks}
                      removeTask={removeTask}
                      setFilter = {setFilter}
            />
        </div>
    );
}

export default App;
