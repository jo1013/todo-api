# Todo API Project

This project is a simple RESTful API for managing a todo list, built with Go and PostgreSQL.

## Table of Contents
1. [Project Structure](#project-structure)
2. [Prerequisites](#prerequisites)
3. [Setup](#setup)
4. [Running the Server](#running-the-server)
5. [API Endpoints](#api-endpoints)
6. [Testing the API](#testing-the-api)
7. [Future Improvements](#future-improvements)

## Project Structure

The project consists of the following main files:

- `main.go`: Contains the main server logic and API handlers
- `db.go`: Handles database connection and initialization
- `todo.go`: Defines the Todo struct and related functions

## Prerequisites

Before you begin, ensure you have the following installed:
- Go (1.16 or later)
- PostgreSQL
- Git (optional, for version control)

## Setup

1. Clone the repository (if using Git):
   ```
   git clone <repository-url>
   cd todo-api
   ```

2. Install the required Go packages:
   ```
   go get github.com/lib/pq
   ```

3. Set up the PostgreSQL database:
   - Open a terminal and start the PostgreSQL command-line interface:
     ```
     psql postgres
     ```
   - Create a new database:
     ```sql
     CREATE DATABASE todo_db;
     ```
   - Exit the PostgreSQL CLI:
     ```
     \q
     ```

4. Update the database connection string:
   - Open `db.go`
   - Locate the `initDB` function
   - Update the `connStr` variable with your PostgreSQL username:
     ```go
     connStr := "user=your_username dbname=todo_db sslmode=disable"
     ```

## Running the Server

To run the server, use the following command in the project root directory:

```
go run *.go
```

If successful, you should see the following output:
```
Successfully connected to database
Server is running on port 8080
```

## API Endpoints

The API provides the following endpoints:

1. `GET /todos`: Retrieve all todo items
2. `POST /todos`: Create a new todo item
3. `PUT /todos?id=<id>`: Update an existing todo item
4. `DELETE /todos?id=<id>`: Delete a todo item

## Testing the API

You can use curl commands to test the API. Here are some examples:

1. Create a new todo item:
   ```
   curl -X POST -H "Content-Type: application/json" -d '{"title":"Buy groceries","completed":false}' 'http://localhost:8080/todos'
   ```

2. Retrieve all todo items:
   ```
   curl 'http://localhost:8080/todos'
   ```

3. Update a todo item (replace `<id>` with the actual item id):
   ```
   curl -X PUT -H "Content-Type: application/json" -d '{"title":"Buy groceries","completed":true}' 'http://localhost:8080/todos?id=<id>'
   ```

4. Delete a todo item (replace `<id>` with the actual item id):
   ```
   curl -X DELETE 'http://localhost:8080/todos?id=<id>'
   ```

Note: When using zsh, make sure to wrap the URL in single quotes to prevent issues with the '?' character.

## Future Improvements

Here are some potential improvements for the project:

1. Implement user authentication and authorization
2. Add input validation and error handling
3. Implement pagination for the GET /todos endpoint
4. Add unit and integration tests
5. Use environment variables for configuration
6. Implement logging for better debugging and monitoring
7. Create a frontend application to interact with the API
8. Dockerize the application for easier deployment

Feel free to contribute to the project by implementing these improvements or suggesting new features!
