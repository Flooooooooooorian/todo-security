import TodoCard from "./TodoCard.tsx";
import {Todo} from "./Todo.ts";
import {TodoStatus} from "./TodoStatus.ts";

type Props = {
    status: TodoStatus,
    todos: Todo[],
    onTodoItemAdd: (text: string) => void
    onTodoItemDelete: (id: string) => void
    onTodoItemUpdate: (todo: Todo) => void
}

export default function TodoColumn(props: Props) {
    return (
        <div>
            <h2>{props.status}</h2>
            {
                props.todos.map(todo => <TodoCard key={todo.id}
                                                  todo={todo}
                                                  onTodoItemDelete={props.onTodoItemDelete}
                                                  onTodoItemUpdate={props.onTodoItemUpdate}/>)
            }
        </div>
    );
}
