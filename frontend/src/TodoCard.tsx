import {Todo} from "./Todo.ts";
import axios from "axios";
import {ChangeEvent, useState} from "react";

type Props = {
    todo: Todo,
    onTodoItemDelete: (id: string) => void
    onTodoItemUpdate: (todo: Todo) => void
}

export default function TodoCard(props: Props) {

    const [description, setDescription] = useState(props.todo.description);

    function deleteThisItem() {
        props.onTodoItemDelete(props.todo.id)
    }

    function changeText(event: ChangeEvent<HTMLInputElement>) {
        const newDescription = event.target.value;
        setDescription(newDescription)
        axios.put("/api/todo/" + props.todo.id, {
            ...props.todo,
            description: newDescription,
        } as Todo)
    }

    function advanceTodo() {
        props.onTodoItemUpdate({...props.todo, status: props.todo.status === "OPEN" ? "IN_PROGRESS" : "DONE"})
    }

    function revertTodo() {
        props.onTodoItemUpdate({...props.todo, status: props.todo.status === "DONE" ? "IN_PROGRESS" : "OPEN"})
    }

    return (
        <div className="todo-card">
            <input value={description} onInput={changeText}/>
            {
                props.todo.status !== "OPEN" && <button onClick={revertTodo}>◀</button>

            }
            <button onClick={deleteThisItem}>🗑️</button>
            {
                props.todo.status !== "DONE" && <button onClick={advanceTodo}>▶</button>
            }
        </div>
    );
}
