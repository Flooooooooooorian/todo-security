import React from 'react';
import {TodoModel} from "../todoModel/TodoModel";
import {Link, useParams} from "react-router-dom";

type Props = {
    todo: TodoModel[]
}

function TodoDetailsCard(props:Props) {

    const params = useParams()
    const id :string | undefined = params.id


    const foundTodo:TodoModel | undefined = props.todo.find(currentTodo => currentTodo.id === id);

    return (
        <div>
            <h1>DIE DETAILS VON: {foundTodo?.description}</h1>
            <h2>DER STATUS:  {foundTodo?.status}</h2>
            <Link to={"/"}>back</Link>
        </div>
    );
}

export default TodoDetailsCard;