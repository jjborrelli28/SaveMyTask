# SaveMyTask - Todo App

Welcome to **SaveMyTask**, a full-stack Todo App built with Node.js, Express, TypeScript, MySQL, React, and Tailwind CSS. It's designed to help you stay on top of your tasks, whether you're tracking personal to-dos or managing project tasks.

## Project Structure

This project consists of two main folders:

- **Backend**: Node.js, Express, TypeScript, and MySQL.
- **Frontend**: React with Tailwind CSS for styling.

## Running the Project Locally

To get the project up and running locally, follow the steps below. It's simple, and I'll walk you through it!

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 20 or higher)
- [MySQL](https://dev.mysql.com/downloads/)
- A good code editor (I personally recommend [VSCode](https://code.visualstudio.com/))

### Steps

1. **Clone the repository**:

   Open your terminal and run the following:

   ```bash
   git clone https://github.com/your-username/savemytask.git
   ```

2. **Navigate into the project folder:**
    ```bash
    cd savemytask
    ```
    
3. **Install dependencies:**

    You’ll need to install dependencies in both the backend and frontend folders. Run the following commands:

    - For the backend:

        ```bash
        cd backend
        npm install
        ```
    - For the frontend:

        ```bash
        cd frontend
        npm install
        ```

4. **Set up the database:**

    - First, make sure MySQL is running locally.

    - Open your MySQL client of choice (or use the terminal) and create a new schema (or database) called savemytask:

        ```bash
        CREATE SCHEMA savemytask;
        ```
    - Now, go back to the backend folder and run the migrations to set up the necessary tables:

        ```bash
        npm run migrations
        ```

5. **Install dependencies:**

    - Start the backend by running the following in the backend folder:

        ```bash
        npm start
        ```

    - Then, go to the frontend folder and start the frontend:

        ```bash
        npm start
        ```
        
6. **Access the app:**

    Once both the backend and frontend are running, open your browser and head to:


        ```bash
        http://localhost:3000
        ```
    You should now see the SaveMyTask app running locally!

## Project Stack
- Backend: Node.js, Express, TypeScript, MySQL
- Frontend: React, Tailwind CSS
- Database: MySQL

## Contributing
Feel free to fork the project and submit pull requests! I’m always open to improvements and new ideas.

Cheers,

JJ 👋
