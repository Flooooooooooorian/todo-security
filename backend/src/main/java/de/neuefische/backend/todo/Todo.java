package de.neuefische.backend.todo;

import org.springframework.data.mongodb.core.mapping.Document;

@Document("todos")
public record Todo(
        String id,
        String description,
        TodoStatus status,
        String author
) {

    Todo(
            String description,
            TodoStatus status
    ) {
        this(null, description, status, null);
    }


    public Todo withId(String id) {
        return new Todo(id, description, status, author);
    }
}
