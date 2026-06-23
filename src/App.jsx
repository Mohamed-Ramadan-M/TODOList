import './App.css'
import ToDoList from './components/ToDoList.jsx';
import {TodosProvider} from './contexts/TodoContext.jsx'
import { ToastProvider } from './contexts/ToastContext.jsx'

function App() {

  return (
    <TodosProvider >
      <ToastProvider >
        <ToDoList />
      </ToastProvider>
    </TodosProvider>


  )
}

export default App
