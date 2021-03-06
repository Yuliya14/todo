import {v1} from 'uuid';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./todolist-reducer";
import {filterTaskType, todolistType} from "../App";

let todolistId1 = v1();
let todolistId2 = v1();
let startState: todolistType[] = []
beforeEach(() => {
    startState = [
        {id: todolistId1, addedDate: "", order: 0, title: "What to learn", filter: 'all'},
        {id: todolistId2, addedDate: "", order: 0, title: "What to buy", filter: 'all'},
    ]
})

test('correct todolist should be removed', () => {
    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});
test('correct todolist should be added', () => {
    let newTodolist: todolistType = {id: v1(), addedDate: "", order: 0, title: "NEW!!", filter: "active"}

    const endState = todolistsReducer(startState, addTodolistAC(newTodolist))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe("NEW!!");
});
test('correct todolist should change its name', () => {
    let newTodolistTitle = "New Todolist";

    const endState = todolistsReducer(startState, changeTodolistTitleAC(newTodolistTitle, todolistId2));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});
test('correct filter of todolist should be changed', () => {
    let newFilter: filterTaskType = "completed";

    const endState = todolistsReducer(startState, changeTodolistFilterAC(newFilter, todolistId2));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});
