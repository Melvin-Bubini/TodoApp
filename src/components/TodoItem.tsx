import styles from "./TodoItem.module.css";
export const TodoItem = ({todo, onTodoUpdate} : {todo: any, onTodoUpdate: Function}) => {

    const statusColor = todo.status === "Ej påbörjad" ? "red" : todo.status === "Pågående" ? "yellow" : "green";

    const updateTodo = async (e : any) => {
        let newStatus = e.target.value;

        const newTodo = {...todo, status: newStatus};

        try {
            const response = await fetch("http://localhost:5036/todoitems/" + todo.id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTodo)
            }) 

            if (!response.ok) {
                throw Error;
            }

           onTodoUpdate();
        } catch (error) {
            
        }
    }

  return (
    <section>
        <h2>{todo.title} </h2>
        <p>{todo.description} </p>
        <p style={{color: statusColor}}><strong>{todo.status} </strong></p>

        <form >
            <label htmlFor="status">Ändra status:</label> <br />
            <select name="status" id={styles.status} defaultValue={todo.status} onChange={updateTodo} >
                <option >Ej påbörjad</option>
                <option >Pågående</option>
                <option >Avklarad</option>
            </select>
        </form>
    </section>
  )
}

