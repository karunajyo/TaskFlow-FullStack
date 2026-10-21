package com.example.task_tracker.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import com.example.task_tracker.model.Task;
import com.example.task_tracker.repository.TaskRepository;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    // Constructor Injection (Best practice in Spring)
    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    // 1. Get all tasks
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    // 2. Get task by ID
    public Optional<Task> getTaskById(Long id) {
        return taskRepository.findById(id);
    }

    // 3. Create a new task
    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    // 4. Update an existing task
    public Task updateTask(Long id, Task updatedTask) {
        return taskRepository.findById(id).map(existingTask -> {
            existingTask.setTitle(updatedTask.getTitle());
            existingTask.setDescription(updatedTask.getDescription());
            existingTask.setCompleted(updatedTask.isCompleted());
            return taskRepository.save(existingTask);
        }).orElseThrow(() -> new RuntimeException("Task not found with id: " + id));
    }

    // 5. Delete a task
    public void deleteTask(Long id) {
        if (!taskRepository.existsById(id)) {
            throw new RuntimeException("Task not found with id: " + id);
        }
        taskRepository.deleteById(id);
    }
}