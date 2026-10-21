# ⚡ TaskFlow Engine — Full-Stack Task Management Platform

[![Java](https://img.shields.io/badge/Java-17-orange.svg)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5-purple.svg)](https://vitejs.dev/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-blue.svg)](https://www.mysql.com/)
[![OpenAPI](https://img.shields.io/badge/Swagger-OpenAPI%203.0-green.svg)](https://swagger.io/)

A modern, production-grade full-stack task management application engineered with **Spring Boot 3**, **Java 17**, and **React (Vite)**. Features a 3-tier layered backend architecture, Hibernate ORM persistence with MySQL, Jakarta Bean Validation, live Swagger documentation, and a sleek dark-mode glassmorphism analytics dashboard.

---

## 📸 Key Features

- **3-Tier Layered Architecture:** Decoupled Controller, Service, and Repository layers using constructor dependency injection.
- **Full CRUD Persistence:** Complete CRUD operations mapped via Spring Data JPA with automatic MySQL schema synchronization (`ddl-auto: update`).
- **Data Validation & Global Error Handling:** Enforces business constraints using `@Valid`, `@NotBlank`, and intercepts runtime errors using `@RestControllerAdvice`.
- **Interactive API Documentation:** Embedded OpenAPI 3.0 / Swagger UI for live endpoint debugging.
- **SaaS Metric Analytics Dashboard:** Real-time KPI cards calculating total tasks, active tasks, completed count, and sprint completion percentage.
- **Live Search & Status Filtering:** Instant client-side query filtering and state toggling.

---

## 🏗️ Architecture Overview

```text
[ Browser / React UI ]  <--- (HTTP / REST + JSON) --->  [ Spring Boot 3 Controller ]
  (Port 5173)                                                    |
                                                                 v
                                                        [ TaskService ]
                                                                 |
                                                                 v
                                                        [ TaskRepository ]
                                                                 |
                                                                 v
                                                        [ MySQL Database ]
                                                          (Port 3306)



🛠️ Tech Stack
Layer	Technologies
Frontend	React 18, Vite 5, Axios, Modern Vanilla CSS (Glassmorphism)
Backend	Java 17, Spring Boot 3, Spring Data JPA, Hibernate ORM
Database	MySQL 8.0, HikariCP Connection Pooling
Documentation & Tools	OpenAPI 3.0 (Swagger UI), Postman, Apache Maven
🚀 API Specification
Method	Endpoint	Description	Status Code
GET	/api/tasks	Fetch all tasks	200 OK
GET	/api/tasks/{id}	Fetch a task by ID	200 OK / 404 Not Found
POST	/api/tasks	Create a new task (Validated)	201 Created / 400 Bad Request
PUT	/api/tasks/{id}	Update existing task status/details	200 OK / 404 Not Found
DELETE	/api/tasks/{id}	Delete a task	204 No Content
💻 Local Setup & Installation
1. Prerequisites
JDK 17 or higher
Node.js (v18+)
MySQL Server (Running on port 3306)
2. Database Configuration
Create the database in MySQL:
code
SQL
CREATE DATABASE task_tracker_db;
Configure your credentials in backend/src/main/resources/application.properties:
code
Properties
spring.datasource.url=jdbc:mysql://localhost:3306/task_tracker_db
spring.datasource.username=YOUR_MYSQL_USERNAME
spring.datasource.password=YOUR_MYSQL_PASSWORD
3. Run Backend (Spring Boot)
code
Bash
cd backend
./mvnw spring-boot:run
API will run on: http://localhost:8082
Swagger Documentation: http://localhost:8082/swagger-ui/index.html
4. Run Frontend (React + Vite)
code
Bash
cd frontend
npm install
npm run dev
Web App will run on: http://localhost:5173


👤 Author
GitHub: Karunajyo
LinkedIn:https://www.linkedin.com/in/karuna-jyothi-cheepurupalli-13028626b?utm_source=share_via&utm_content=profile&utm_medium=member_android