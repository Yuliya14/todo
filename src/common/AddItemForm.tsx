import React, {ChangeEvent, KeyboardEvent, MouseEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
    disabled?: boolean
}
export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    const [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const addItem = (e: MouseEvent<HTMLButtonElement>) => {
        if (title.trim() !== "") {
            props.addItem(title)
            setTitle('')
        } else {
            setError('Field is required!')
        }
    }
    const setTitleTask = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) setError(null)
        if (e.charCode === 13 && title.trim() !== "") {
            props.addItem(title)
            setTitle('')
        } else if (e.charCode === 13 && title.trim() === "") {
            setError('Field is required!')
            if (error !== null) setError(null)
        }
    }

    return <div>
        <TextField id="outlined-basic" label="Title" variant="outlined" disabled={props.disabled}
                   className={error ? 'error' : ''} value={title} onChange={setTitleTask} onKeyPress={onKeyPressHandler}/>
        <IconButton onClick={addItem}>
           <AddBox/>
        </IconButton>
        {error && <div className={'error-message'}>{error}</div>}
    </div>
})