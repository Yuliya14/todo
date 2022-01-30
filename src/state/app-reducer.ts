const initialState = {
    status: 'loading' as requestStatusType
}

export const appReducer = (state = initialState, action: actionsType): initialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        default:
            return {...state}
    }
}

//action creator

export const setAppStatusAC = (status: requestStatusType)=> {
    return {type: 'APP/SET-STATUS', status} as const
}

export type requestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type initialStateType = typeof initialState
type actionsType = ReturnType<typeof setAppStatusAC>
