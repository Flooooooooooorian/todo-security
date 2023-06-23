import {Todo} from "./Todo.ts";
import axios from "axios";
import {useState} from "react";

type Props = {
    todo: Todo,
    onTodoItemChange: () => void
}

export default function TodoCard(props: Props) {

    const [description, setDescription] = useState(props.todo.description);

    function deleteThisItem() {
        axios.delete("/api/todo/" + props.todo.id)
            .then(props.onTodoItemChange)
    }

    function changeText(event: React.ChangeEvent<HTMLInputElement>) {
        const newDescription = event.target.value;
        setDescription(newDescription)
        axios.put("/api/todo/" + props.todo.id, {
            ...props.todo,
            description: newDescription,
        } as Todo)
    }

    return (
        <div className="todo-card">
            <input value={description} onInput={changeText}/>
            <button onClick={deleteThisItem}>🗑️</button>
        </div>
    );
}
