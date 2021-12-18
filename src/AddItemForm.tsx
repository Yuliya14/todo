import React, {ChangeEvent, KeyboardEvent, MouseEvent, useState} from "react";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}
export const AddItemForm = (props: AddItemFormPropsType) => {
    const [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const addTask = (e: MouseEvent<HTMLButtonElement>) => {
        if (title.trim() !== "") {
            props.addItem(title)
            setTitle('')
        } else {
            setError('Field is required!')
        }

    }
    const setTitleTask = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13 && title.trim() !== "") {
            props.addItem(title)
            setTitle('')
        } else if (e.charCode === 13 && title.trim() === "") {
            setError('Field is required!')
        }
    }

    return <div>
        <input className={error ? 'error' : ''} value={title} onChange={setTitleTask} onKeyPress={onKeyPressHandler}/>
        <button onClick={addTask}>+</button>
        {error && <div className={'error-message'}>{error}</div>}
    </div>
}