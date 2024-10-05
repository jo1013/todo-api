# Todo API Project

This project is a full-stack application for managing a todo list, built with Go and PostgreSQL for the backend, and React for the frontend.

## Table of Contents
1. [Project Structure](#project-structure)
2. [Prerequisites](#prerequisites)
3. [Setup](#setup)
4. [Running the Server](#running-the-server)
5. [API Endpoints](#api-endpoints)
6. [Frontend Application](#frontend-application)
7. [Testing the API](#testing-the-api)
8. [Future Improvements](#future-improvements)

## Project Structure

The project consists of the following main components:

Backend:
- `main.go`: Contains the main server logic, API handlers, and CORS configuration
- `db.go`: Handles database connection and initialization
- `todo.go`: Defines the Todo struct and related functions

Frontend:
- `todo-frontend/`: React application directory
- `todo-frontend/src/App.js`: Main React component for the Todo application

## Prerequisites

Before you begin, ensure you have the following installed:
- Go (1.16 or later)
- PostgreSQL
- Node.js and npm (for React frontend)
- Git (optional, for version control)
## Setup

1. Clone the repository (if using Git):
   ```
   git clone <repository-url>
   cd todo-api
   ```

2. Install PostgreSQL (if not already installed):
   For Ubuntu or Debian-based systems:
   ```
   sudo apt-get update
   sudo apt-get install postgresql postgresql-contrib
   ```
   For other operating systems, please refer to the [official PostgreSQL documentation](https://www.postgresql.org/download/).

3. Start PostgreSQL service:
   ```
   sudo systemctl start postgresql
   sudo systemctl enable postgresql
   ```

4. Install the required Go packages:
   ```
   go get github.com/lib/pq
   go get github.com/rs/cors
   ```

5. Set up the PostgreSQL database:
   - Open a terminal and start the PostgreSQL command-line interface:
     ```
     sudo -u postgres psql
     ```
   - Create a new database:
     ```sql
     CREATE DATABASE todo_db;
     ```
   - Create a new user and grant privileges (replace 'your_username' and 'your_password'):
     ```sql
     CREATE USER your_username WITH PASSWORD 'your_password';
     GRANT ALL PRIVILEGES ON DATABASE todo_db TO your_username;
     ```
   - Exit the PostgreSQL CLI:
     ```
     \q
     ```

6. Update the database connection string:
   - Open `db.go`
   - Locate the `initDB` function
   - Update the `connStr` variable with your PostgreSQL username and password:
     ```go
     connStr := "user=your_username password=your_password dbname=todo_db sslmode=disable"
     ```

7. Set up the frontend:
   ```
   cd todo-frontend
   npm install
   ```

After completing these steps, you should be ready to run the server and start using the application.

## Running the Server

To run the backend server, use the following command in the project root directory:

```
go run *.go
```

If successful, you should see the following output:
```
Successfully connected to database
Server is running on port 8080
```

To run the frontend development server:

```
cd todo-frontend
npm start
```

The React application will be available at `http://localhost:3000`.

## API Endpoints

The API provides the following endpoints:

1. `GET /todos`: Retrieve all todo items
2. `POST /todos`: Create a new todo item
3. `PUT /todos?id=<id>`: Update an existing todo item
4. `DELETE /todos?id=<id>`: Delete a todo item

## Frontend Application

The frontend is a React application that provides a user interface for interacting with the Todo API. It includes the following features:

- Display a list of todo items
- Add new todo items
- Mark todo items as complete/incomplete
- Edit existing todo items
- Delete todo items

The main component (`App.js`) uses React hooks for state management and effect handling.

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

## CORS Configuration

The backend server is configured to handle Cross-Origin Resource Sharing (CORS), allowing the frontend application to make requests to the API. This is implemented using the `github.com/rs/cors` package in the `main.go` file:

```go
c := cors.New(cors.Options{
    AllowedOrigins: []string{"http://localhost:3000"}, // React app's address
    AllowedMethods: []string{"GET", "POST", "PUT", "DELETE"},
    AllowedHeaders: []string{"Content-Type"},
})

handler := c.Handler(mux)
```

This configuration allows requests from the React application running on `http://localhost:3000` and specifies the allowed HTTP methods and headers.

## Future Improvements

Here are some potential improvements for the project:

1. Implement user authentication and authorization
2. Add input validation and error handling
3. Implement pagination for the GET /todos endpoint
4. Add unit and integration tests
5. Use environment variables for configuration
6. Implement logging for better debugging and monitoring
7. Enhance the frontend with more advanced features (e.g., filtering, sorting)
8. Dockerize the application for easier deployment
9. Implement real-time updates using WebSockets
10. Add offline support and data synchronization for the frontend

Feel free to contribute to the project by implementing these improvements or suggesting new features!