import React from 'react';
import {TodoModel} from "../todoModel/TodoModel";
import axios from "axios";
import "./TodoCard.css"
import {useNavigate, useParams} from "react-router-dom";

type Props = {
    todo: TodoModel
    getTodos : () => void
}

function TodoCard(props: Props) {

    const navigate  = useNavigate();


    function setTodoStatusToTheNext() {
        props.todo.status === "OPEN" ?
            axios.put("api/todo/" + props.todo.id, {
                id: props.todo.id,
                description: props.todo.description,
                status: "IN_PROGRESS"

            }).then(props.getTodos) :
            axios.put("api/todo/" + props.todo.id, {
                id: props.todo.id,
                description: props.todo.description,
                status: "DONE"
            }).then(props.getTodos)
    }

    function sendDeleteToBackend(){
        axios.delete("/api/todo/" + props.todo.id)
            .then(props.getTodos)
    }

    function onClickHandlerForDetails(){
        navigate("/todos/" + props.todo.id)
    }


    return (
        <div className={"todoCard"}>
            <h1>{props.todo.description}</h1>
            <p>{props.todo.status}</p>
            {props.todo.status === "DONE" ?
                <button onClick={sendDeleteToBackend}>DELETE</button>
                :
                <button onClick={setTodoStatusToTheNext}>ADVANCE</button>
            }
            <button onClick={onClickHandlerForDetails}>DETAILS</button>
        </div>
    );
}

export default TodoCard;