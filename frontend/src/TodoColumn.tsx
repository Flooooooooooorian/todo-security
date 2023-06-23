import TodoCard from "./TodoCard.tsx";
import {Todo} from "./Todo.ts";
import {TodoStatus} from "./TodoStatus.ts";
import NewTodoCard from "./NewTodoCard.tsx";

type Props = {
    status: TodoStatus,
    todos: Todo[],
    onTodoItemChange: () => void
}

export default function TodoColumn(props: Props) {
    return (
        <div>
            <h2>{props.status}</h2>
            {
                props.todos.map(todo => <TodoCard todo={todo} key={todo.id} onTodoItemChange={props.onTodoItemChange}/>)
            }
            {
                (props.status === "OPEN") && <NewTodoCard onTodoItemChange={props.onTodoItemChange}/>
            }
        </div>
    );
}
