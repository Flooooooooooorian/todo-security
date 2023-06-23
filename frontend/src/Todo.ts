import {TodoStatus} from "./TodoStatus.ts";

export type Todo = {
    id: string,
    description: string,
    status: TodoStatus,
}
