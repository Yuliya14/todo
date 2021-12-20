import {todolistType} from "../App";

type ActionsType = {
    type: string
}
export const todolistReducer = (state: todolistType[], action: ActionsType) => {
    switch (action.type){
        case "bla":
            return state
        default: throw new Error("I don't understand this type")
    }
}