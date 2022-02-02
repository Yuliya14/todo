import {tasksType, todolistType} from "../App";
import {addTodolistAC, todolistsReducer} from "./todolist-reducer";
import {tasksReducer} from "./tasks-reducer";
import {v1} from "uuid";

test('ids should be equals', () => {
    const startTasksState: tasksType = {};
    const startTodolistsState: Array<todolistType> = [];
    let newTodolist: todolistType = {id: v1(), addedDate: "", order: 0, title: "NEW!!", filter: "active",entityStatus: 'idle' }

    const action = addTodolistAC(newTodolist);

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todolist.id);
    expect(idFromTodolists).toBe(action.todolist.id);
});
