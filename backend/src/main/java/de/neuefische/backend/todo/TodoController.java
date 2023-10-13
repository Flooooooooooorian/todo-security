package de.neuefische.backend.todo;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/todo")
class TodoController {

    private final TodoService todoService;

    TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping
    List<Todo> getAll() {
        return todoService.getAll();
    }

    @PostMapping
    Todo postTodo(@RequestBody Todo todo) {
        return todoService.save(todo);
    }

    @GetMapping("{id}")
    Todo getTodoById(@PathVariable String id) {
        return todoService.getById(id);
    }

    @PutMapping(path = {"{id}/update", "{id}"})
    Todo update(@PathVariable String id, @RequestBody Todo todo) {
        if (!todo.id().equals(id)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "The id in the url does not match the request body's id");
        }
        return todoService.update(todo);
    }

    @DeleteMapping("{id}")
    void delete(@PathVariable String id) {
        todoService.delete(id);
    }

    @PostMapping("abc")
    String test() {
        System.out.println("test");
        System.out.println("test");
        System.out.println("test");
        System.out.println("test");
        System.out.println("test");
        System.out.println("test");
        var a = "a";
        var b = "456";
        var c = "789";
        var d = "1304";

        for (int i = 0; i < 10; i++) {
            System.out.println("for");
        }

        if (11 % 2 == 0) {
            System.out.println(a);
        }
        else {
            System.out.println("f");
        }

        switch (a) {
            case "a":
                return a;
            case "b":
                return b;
            case "c":
                return c;
            case "d":
                return d;
            default:
                throw new IllegalStateException("Unexpected value: " + a);
        }
    }
}






