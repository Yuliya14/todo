import React, {ChangeEvent, MouseEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {HighlightOff} from "@material-ui/icons";
import {EditableSpan} from "./EditableSpan";
import {taskType} from "./App";

type TaskPropsType = {
    todolistId: string
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, completed: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    task: taskType
}
export const Task = React.memo((props: TaskPropsType) => {
        const removeTask = useCallback((e: MouseEvent<HTMLButtonElement>) => {
            props.removeTask(props.task.id, props.todolistId)
        }, [props])
        const changeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
            let currentTaskCompleted = e.currentTarget.checked
            props.changeTaskStatus(props.task.id, currentTaskCompleted, props.todolistId)
        }, [props])
        const changeTaskTitle = useCallback((newTitle: string) => {
            props.changeTaskTitle(props.task.id, newTitle, props.todolistId)
        }, [props])
        return <div key={props.task.id}>
            <li className={props.task.completed ? 'is-done' : ''}>
                <IconButton onClick={removeTask}>
                    <HighlightOff/>
                </IconButton>
                <Checkbox
                    checked={props.task.completed}
                    onChange={changeTaskStatus}
                    color="secondary"
                />
                <EditableSpan title={props.task.title} onChange={changeTaskTitle}/>
            </li>
        </div>
    })