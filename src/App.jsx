// import { useState } from 'react'
import './App.css'
import ToDoList from './component/ToDoList.jsx';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react'
import { todocontext } from './component/contextcom.jsx'

const todolist = [
  {
    id: uuidv4(),
    task: "reading book",
    details: "reach dad and poor dad",
    isCompleted: false
  },
  {
    id: uuidv4(),
    task: "do exrcises",
    details: "push pull legs",
    isCompleted: false
  },
  {
    id: uuidv4(),
    task: "watching movie",
    details: "fast & farios",
    isCompleted: false
  }
]

function App() {
  const [todos, setTodos] = useState(todolist)
  return (
    <todocontext.Provider value={{ todos, setTodos }}>
      <ToDoList />
    </todocontext.Provider>


  )
}

export default App
