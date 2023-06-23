import TodoCard from "./TodoCard.tsx";
import {Todo} from "./Todo.ts";
import {TodoStatus} from "./TodoStatus.ts";

type Props = {
    status: TodoStatus,
    todos: Todo[],
}

export default function TodoColumn(props: Props) {
    return (
        <div>
            <h2>{props.status}</h2>
            {
                props.todos.map(todo => <TodoCard todo={todo} key={todo.id}/>)
            }
        </div>
    );
}
