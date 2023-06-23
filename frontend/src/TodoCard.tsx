import {Todo} from "./Todo.ts";
import axios from "axios";
import {useState} from "react";
import {TodoStatus} from "./TodoStatus.ts";

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

    function move(targetStatus: TodoStatus) {
        axios.put("/api/todo/" + props.todo.id, {
            ...props.todo,
            status: targetStatus,
        } as Todo)
            .then(props.onTodoItemChange)
    }

    return (
        <div className="todo-card">
            <input value={description} onInput={changeText}/>
            {
                props.todo.status === "OPEN"
                    ? <div></div>
                    : (
                        props.todo.status === "IN_PROGRESS"
                            ? <button onClick={() => move("OPEN")}>◀</button>
                            : <button onClick={() => move("IN_PROGRESS")}>◀</button>
                    )
            }
            <button onClick={deleteThisItem}>🗑️</button>
            {
                props.todo.status === "DONE"
                    ? <div></div>
                    : (
                        props.todo.status === "OPEN"
                            ? <button onClick={() => move("IN_PROGRESS")}>▶</button>
                            : <button onClick={() => move("DONE")}>▶</button>
                    )
            }
        </div>
    );
}
