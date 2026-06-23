import { v4 as uuidv4 } from 'uuid';

const todoReducer = (currentTodos, { type, payload }) => {
    switch (type) {
        case "added": {
            if (!payload.title.trim()) return currentTodos;

            const newTask = {
                id: uuidv4(),
                task: payload.title,
                details: "",
                isCompleted: false
            };

            const data = [...currentTodos, newTask];
            localStorage.setItem("todos", JSON.stringify(data));
            return data;
        }
        case "updated": {
            const editedTask = currentTodos.map((t) => {
                if (t.id === payload.todo.id) {
                    return { ...t, task: payload.todo.task, details: payload.taskDetails }
                } else {
                    return t
                }
            })

            localStorage.setItem("todos", JSON.stringify(editedTask))
            return editedTask
        }
        case "deleted": {
            const deletedTask = currentTodos.filter((t) => {
                return t.id == payload.id ? false : true
            })

            localStorage.setItem("todos", JSON.stringify(deletedTask))
            return deletedTask
        }
        case "toggelCheck": {
            const updateTodo = currentTodos.map((t) => {
                if (t.id == payload.todo.id) {
                    return { ...t, isCompleted: !t.isCompleted }
                }
                return t
            })
            localStorage.setItem("todos", JSON.stringify(updateTodo))
            return (updateTodo)
        }
        case "getData": {
            
            const gitFromLocalStorage = JSON.parse(localStorage.getItem("todos")) ?? [];

            return gitFromLocalStorage

        }

        default:
            return currentTodos;
    }
};

export default todoReducer;