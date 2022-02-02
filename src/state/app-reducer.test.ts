import {appReducer, requestStatusType, setAppErrorAC, setAppStatusAC, setInitialised} from "./app-reducer";

type startStateType = {
    status: requestStatusType
    error: string | null
    isInitialised: boolean
}
let startState: startStateType

beforeEach(() => {
    startState = {
        status: 'idle',
        error: null,
        isInitialised: false
    }
})

test('correct error message should be set', () => {
    const endState = appReducer(startState, setAppErrorAC({value: "some error"}))
    expect(endState.error).toBe("some error");
});
test('correct status should be set', () => {
    const endState = appReducer(startState, setAppStatusAC({value: "loading"}))
    expect(endState.status).toBe("loading");
});
test('isInitialised should be change', () => {
    const endState = appReducer(startState, setInitialised({value: true}))
    expect(endState.isInitialised).toBe(true);
});