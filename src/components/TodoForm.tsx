import styles from './TodoForm.module.css';
import { useState } from 'react';
import { TodoInterface } from '../App';

interface TodoFormProps {
    onAddTodo: () => void;
}
export const TodoForm = ({ onAddTodo }: TodoFormProps) => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("Ej påbörjad");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newTodo: TodoInterface = { title, description, status };

        try {
            const response = await fetch("http://localhost:5036/todoitems", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTodo),
            });
            if (!response.ok) {
                throw new Error("Kunde inte lägga till todo");
            }

            setTitle("");
            setDescription("");
            setStatus("Ej påbörjad");

            onAddTodo();
        } catch (error) {
            console.error("Fel vid skapande av todo:", error);
        }
    }
    return (
        <div className={styles.formContainer}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label htmlFor="title">Titel:</label>
                <input type="text" name="title" id="title" minLength={3} value={title} onChange={(e) => setTitle(e.target.value)} />
                <label htmlFor="description">Beskrivning:</label>
                <input name="description" id="description" maxLength={200} value={description} onChange={(e) => setDescription(e.target.value)} />
                <label htmlFor="status">Status</label>
                <select name="status" id={styles.status} value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option >Ej påbörjad</option>
                    <option >Pågående</option>
                    <option >Avklarad</option>
                </select>
                <button className={styles.submitBtn} type="submit">Lägg till</button>
            </form>
        </div>
    )
}
