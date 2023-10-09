package de.neuefische.backend.todo;

import org.springframework.data.mongodb.core.mapping.Document;

@Document("todos")
public record Todo(
        String id,
        String description,
        TodoStatus status
) {

    Todo(
            String description,
            TodoStatus status
    ) {
        this(null, description, status);
    }


    public Todo withId(String id) {
        return new Todo(id, description, status);
    }
}
