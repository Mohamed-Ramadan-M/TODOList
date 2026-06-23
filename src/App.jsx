import './App.css'
import ToDoList from './components/ToDoList.jsx';
import {TodosProvider} from './contexts/TodoContext.jsx'
import { ToastProvider } from './contexts/ToastContext.jsx'
import { Analytics } from '@vercel/analytics/react';

function App() {

  return (
    <TodosProvider >
      <ToastProvider >
        <ToDoList />
        <Analytics />
      </ToastProvider>
    </TodosProvider>


  )
}

export default App
