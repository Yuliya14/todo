import TextField from "@material-ui/core/TextField/TextField";
import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void
    disabled?: boolean
}
export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(props.title)
    const activateEditMode = () => {
        props.disabled ?  setEditMode(false) : setEditMode(true)
        setTitle(props.title)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }
    const changeTitle = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return editMode
        ? <TextField id="standard-basic" label="Title" variant="standard"
                     value={title} autoFocus onBlur={activateViewMode} onChange={changeTitle}/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
})