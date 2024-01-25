import {Todo} from "./Todo.ts";
import {allPossibleTodos} from "./TodoStatus.ts";
import TodoColumn from "./TodoColumn.tsx";


type TodoGalleryProps = {
    todos: Todo[],
    addTodo: (text: string) => void,
    deleteTodo: (id: string) => void,
    updateTodo: (todo: Todo) => void
}

export default function TodoGallery(props: TodoGalleryProps) {

    return (
        <div>
            {
                allPossibleTodos.map(status => {
                    const filteredTodos = props.todos.filter(todo => todo.status === status)
                    return <TodoColumn
                        status={status}
                        todos={filteredTodos}
                        onTodoItemAdd={props.addTodo}
                        onTodoItemDelete={props.deleteTodo}
                        onTodoItemUpdate={props.updateTodo}
                        key={status}
                    />
                })
            }
        </div>
    )
}
