import React from 'react';
import {TodoModel} from "../todoModel/TodoModel";
import TodoCard from "../todoCard/TodoCard";

type Props = {
    todos:TodoModel[]
    getTodos: () => void
}

function OpenTodos(props:Props) {
    return (
        <div className="openTodoWrapper">
            {props.todos.map(todo => <TodoCard todo={todo} getTodos={props.getTodos}/>)}
        </div>
    );
}

export default OpenTodos;