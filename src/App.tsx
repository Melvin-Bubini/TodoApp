import './App.css'
import { TodoItem } from './components/TodoItem';
import useGet from './hooks/useGet';
import { TodoForm } from './components/TodoForm';

export interface TodoInterface {
  id?: number,
  title: string,
  description: string,
  status: string
}

function App() {

  const {data : todos, error, loading, fetchData} = useGet<TodoInterface[]>("http://localhost:5036/todoitems");

  return (
    <>
      <main>
        <h1>Att göra lista:</h1>

        <TodoForm onAddTodo={fetchData}/>

        {loading && <p><strong>Laddar...</strong></p>}
        {error && <p><strong>Ett fel har uppstått: {error}</strong></p>}

        <div className='todoItem'>
          {
            todos && todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} onTodoUpdate={fetchData}/>
            ))
          }
        </div>
      </main>
    </>
  )
}

export default App
