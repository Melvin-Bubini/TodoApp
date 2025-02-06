import { useState, useEffect } from 'react'

import './App.css'

interface TodoInterface {
  id: number;
  title: string;
  description: boolean;
  status: string;
}

function App() {

  const [todos, setTodos] = useState<TodoInterface | []>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const response = await fetch('http://localhost:5036/todoitems');

      if (!response.ok) {
        throw new Error(`Det blev ett fel: ${response.status}`);
      }

      const data = await response.json();
      setTodos(data);


    } catch (error) {
      setError(`Det blev ett fel vid inhämntning av todos: ${error}`);
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <>
      <main>
        <h1>Startsidan</h1>

        {loading && <p><strong>Laddar...</strong></p>}

        {error && <p><strong>Ett fel har uppstått: {error}</strong></p>}
      </main>
    </>
  )
}

export default App
