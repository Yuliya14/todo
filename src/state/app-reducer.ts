const initialState = {
    status: 'loading' as requestStatusType,
    error: null as string | null
}

export const appReducer = (state = initialState, action: actionsType): initialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return {...state}
    }
}

//action creator

export const setAppStatusAC = (status: requestStatusType) => {
    return {type: 'APP/SET-STATUS', status} as const
}
export const setAppErrorAC = (error: string | null) => {
    return {type: 'APP/SET-ERROR', error} as const
}

export type requestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type initialStateType = typeof initialState
export type actionsType = ReturnType<typeof setAppStatusAC> | ReturnType<typeof setAppErrorAC>
