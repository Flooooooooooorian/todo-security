import {Todo} from "./Todo.ts";

type Props = {
    todo: Todo,
}

export default function TodoCard(props: Props) {
    return (
        <div className="todo-card">
            {props.todo.description}
        </div>
    );
}
