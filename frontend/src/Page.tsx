import {allPossibleTodos} from "./TodoStatus.ts";
import TodoColumn from "./TodoColumn.tsx";
import {Todo} from "./Todo.ts";

type TodoGalleryProps = {
    todos: Todo[]
    onTodoItemAdd: (text: string) => void
    onTodoItemDelete: (id: string) => void
    onTodoItemUpdate: (todo: Todo) => void
}
export default function TodoGalleryView(props: TodoGalleryProps) {

    console.log(props.todos)

    return allPossibleTodos.map(status => {
        const filteredTodos = props.todos.filter(todo => todo.status === status)
        return <TodoColumn
            status={status}
            todos={filteredTodos}
            onTodoItemAdd={props.onTodoItemAdd}
            onTodoItemDelete={props.onTodoItemDelete}
            onTodoItemUpdate={props.onTodoItemUpdate}
            key={status}
        />
    })
}
