import TodoCard from "./TodoCard.tsx";
import {Todo} from "./Todo.ts";
import {TodoStatus} from "./TodoStatus.ts";
import NewTodoCard from "./NewTodoCard.tsx";

type Props = {
    status: TodoStatus,
    todos: Todo[],
    onNewTodoItemSaved: () => void
}

export default function TodoColumn(props: Props) {
    return (
        <div>
            <h2>{props.status}</h2>
            {
                props.todos.map(todo => <TodoCard todo={todo} key={todo.id}/>)
            }
            {
                (props.status === "OPEN") && <NewTodoCard onNewTodoItemSaved={props.onNewTodoItemSaved}/>
            }
        </div>
    );
}
