import {Todo} from "./Todo.ts";
import axios from "axios";

type Props = {
    todo: Todo,
    onTodoItemChange: () => void
}

export default function TodoCard(props: Props) {

    function deleteThisItem() {
        axios.delete("/api/todo/" + props.todo.id)
            .then(props.onTodoItemChange)
    }

    return (
        <div className="todo-card">
            {props.todo.description}
            <button onClick={deleteThisItem}>🗑️</button>
        </div>
    );
}
