import {
    addTaskAC,
    addTodolistAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from './tasks-reducer';
import {tasksType} from "../App";
import {removeTodolistAC} from "./todolist-reducer";
import {TaskStatuses} from "../api/TodolistsAPI";

let startState: tasksType = {}
beforeEach(() => {
    startState = {
        "todolistId1": [
            {
                id: "1", description: "", title: "Learn React", completed: false, status: 1, priority: 1,
                startDate: "", deadline: "", todoListId: "", order: 1, addedDate: ""
            },
            {
                id: "2", description: "", title: "JS", completed: false, status: 1, priority: 1,
                startDate: "", deadline: "", todoListId: "", order: 1, addedDate: ""
            },
            {
                id: "3", description: "", title: "React", completed: false, status: 1, priority: 1,
                startDate: "", deadline: "", todoListId: "", order: 1, addedDate: ""
            },
        ],
        "todolistId2": [
            {
                id: "1", description: "", title: "bread", completed: false, status: 1, priority: 1,
                startDate: "", deadline: "", todoListId: "", order: 1, addedDate: ""
            },
            {
                id: "2", description: "", title: "milk", completed: false, status: 1, priority: 1,
                startDate: "", deadline: "", todoListId: "", order: 1, addedDate: ""
            },
            {
                id: "3", description: "", title: "tea", completed: false, status: 1, priority: 1,
                startDate: "", deadline: "", todoListId: "", order: 1, addedDate: ""
            },
        ]
    }
})
test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC("todolistId2", "3");

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        "todolistId1": [
            {
                id: "1", description: "", title: "Learn React", completed: false, status: 1, priority: 1,
                startDate: "", deadline: "", todoListId: "", order: 1, addedDate: ""
            },
            {
                id: "2", description: "", title: "JS", completed: false, status: 1, priority: 1,
                startDate: "", deadline: "", todoListId: "", order: 1, addedDate: ""
            },
            {
                id: "3", description: "", title: "React", completed: false, status: 1, priority: 1,
                startDate: "", deadline: "", todoListId: "", order: 1, addedDate: ""
            },
        ],
        "todolistId2": [
            {
                id: "1", description: "", title: "bread", completed: false, status: 1, priority: 1,
                startDate: "", deadline: "", todoListId: "", order: 1, addedDate: ""
            },
            {
                id: "2", description: "", title: "milk", completed: false, status: 1, priority: 1,
                startDate: "", deadline: "", todoListId: "", order: 1, addedDate: ""
            },
        ]
    });

});
test('correct task should be added to correct array', () => {

    const action = addTaskAC({
    description: "",
    title: "juce",
    completed: false,
    status: 0,
    priority: 0,
    startDate: "",
    deadline: "",
    id: "",
    todoListId: "todolistId2",
    order: 0,
    addedDate: "",});

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juce");
    expect(endState["todolistId2"][0].completed).toBe(false);
})
test('status of specified task should be changed', () => {

    const action = changeTaskStatusAC("todolistId2", "2", 2);

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].status).toBe(2);
    expect(endState["todolistId2"].length).toBe(3);
});
test('title of specified task should be changed', () => {
    const action = changeTaskTitleAC("todolistId2", "2", 'meat');

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].title).toBe('meat');
    expect(endState["todolistId2"].length).toBe(3);
});
test('new array should be added when new todolist is added', () => {

    const action = addTodolistAC("new todolist");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k !== "todolistId1" && k !== "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});
test('property with todolistId should be deleted', () => {

    const action = removeTodolistAC("todolistId2");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});







