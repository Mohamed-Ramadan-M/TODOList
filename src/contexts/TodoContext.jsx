import { createContext, useReducer } from "react";
import  todoReducer  from '../reducers/TodosReducer.jsx'

// eslint-disable-next-line react-refresh/only-export-components
export const TodoContext = createContext({});

export const TodosProvider = ({ children }) => {

    const [todos, dispach] = useReducer(todoReducer,[])

    return (
        <TodoContext.Provider value={{ todos, dispach }}>
            {children}
        </TodoContext.Provider>
    )
}

