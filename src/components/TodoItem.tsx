import styles from "./TodoItem.module.css";
import { motion } from "framer-motion";
export const TodoItem = ({ todo, onTodoUpdate }: { todo: any, onTodoUpdate: Function }) => {

    const statusColor = todo.status === "Ej påbörjad" ? "red" : todo.status === "Pågående" ? "yellow" : "green";

    const updateTodo = async (e: any) => {
        let newStatus = e.target.value;

        const newTodo = { ...todo, status: newStatus };

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
            console.log("Fel vid updatering av todo:", error);
        }
    }

    const deleteTodo = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5036/todoitems/" + todo.id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(todo)
            });

            if (!response.ok) {
                throw new Error("Kunde inte ta bort todo");
            }

            onTodoUpdate();
        } catch (error) {
            console.error("Fel vid radering av todo:", error)
        }
    }

    return (
        <motion.div initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }} className={styles.todoItem}>
            <h2>{todo.title} </h2>
            <p>{todo.description} </p>
            <p style={{ color: statusColor }}><strong>{todo.status} </strong></p>

            <form >
                <label htmlFor="status">Ändra status:</label> <br />
                <select name="status" id={styles.status} defaultValue={todo.status} onChange={updateTodo} >
                    <option >Ej påbörjad</option>
                    <option >Pågående</option>
                    <option >Avklarad</option>
                </select><br />
                <button onClick={deleteTodo} className={styles.deleteBtn} type="button">Radera</button>
            </form>
        </motion.div >
    )
}

