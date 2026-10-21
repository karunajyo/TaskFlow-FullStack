package com.example.task_tracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.task_tracker.model.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    // JpaRepository gives us:
    // .findAll(), .findById(), .save(), .deleteById() automatically!
}