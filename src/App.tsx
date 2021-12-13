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
export type tasksType = {
    [key: string]: taskType[]
}
export type filterTaskType = 'all' | 'active' | 'completed'
export type todolistTypeAPI = {
    id: string
    addedDate: string
    order: number
    title: string
}
export type todolistType = todolistTypeAPI & {
    filter: filterTaskType
}

function App() {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodolists] = useState<todolistType[]>([
        {id: todolistId1, addedDate: "", order: 0, title: "Home", filter: 'all'},
        {id: todolistId2, addedDate: "", order: 0, title: "Work", filter: 'all'},
    ])
    const [tasks, setTasks] = useState<tasksType>({
        [todolistId1]: [
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
        ],
        [todolistId2]: [
            {
                id: v1(), description: "", title: "Test", completed: false, status: 1, priority: 1,
                startDate: "", deadline: "", todoListId: "", order: 1, addedDate: ""
            },
            {
                id: v1(), description: "", title: "GraphQL", completed: false, status: 1, priority: 1,
                startDate: "", deadline: "", todoListId: "", order: 1, addedDate: ""
            },
        ]
    })

    const removeTask = (taskId: string, todolistId: string)=> {
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = todolistTasks.filter(t => t.id !== taskId)
        setTasks({...tasks})
    }
    const addTask = (title: string, todolistId: string) => {
        let todolistTasks = tasks[todolistId]
        let newTask = {
            id: v1(), description: "", title, completed: false, status: 1, priority: 1,
            startDate: "", deadline: "", todoListId: "", order: 1, addedDate: ""
        }
        tasks[todolistId] = [newTask, ...todolistTasks]
        setTasks({...tasks})
    }
    const changeTaskStatus = (taskId: string, completed: boolean, todolistId: string) => {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(t => t.id === taskId)
        if (task) {
            task.completed = completed
            tasks[todolistId] = [...todolistTasks]
            setTasks({...tasks})
        }
    }

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
    }
    const changeFilterTodolist = (filterValue: filterTaskType, todolistId: string) => {
        const todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = filterValue
            setTodolists([...todolists])
        }
    }

    return (
        <div> {todolists.map(t => {
            let allTodolistTasks = tasks[t.id]
            let filteredTasks: taskType[]
            if (t.filter === 'all') filteredTasks = allTodolistTasks
            else {
                t.filter === 'active'
                    ? filteredTasks = allTodolistTasks.filter(t => !t.completed)
                    : filteredTasks = allTodolistTasks.filter(t => t.completed)
            }
            return <Todolist key={t.id}
                             todolistId={t.id}
                             title={t.title}
                             filter={t.filter}
                             tasks={filteredTasks}
                             removeTodolist = {removeTodolist}
                             changeTodolistFilter={changeFilterTodolist}
                             removeTask={removeTask}
                             addTask={addTask}
                             changeTaskStatus={changeTaskStatus}/>
        })}
        </div>
    );
}

export default App;
