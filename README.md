
# Jobify
# JobBoard Backend - Laravel API

## Table of Contents
- [Project Title](#project-title)
- [Prerequisites](#prerequisites)
- [Project Installation](#project-installation)
  - [Install Dependencies](#install-dependencies)
  - [Create .env file](#create-env-file)
  - [Set Up the Database](#set-up-the-database)
  - [Run Migrations and Seeders](#run-migrations-and-seeders)
- [Useful Commands](#useful-commands)
- [Routes and Controllers](#routes-and-controllers)
  - [Authentication Routes](#authentication-routes)
  - [Advertisement Routes](#advertisement-routes)
  - [Companies Routes](#companies-routes)
  - [User Routes](#user-routes)
  - [Applications Routes](#applications-routes)
  - [Unregistered Users Routes](#unregistered-users-routes)
- [Controller Description](#controller-description)
- [Authentication](#authentication)
- [Error Handling and Testing API](#error-handling-and-testing-api)
- [Example API Testing with Postman](#example-api-testing-with-postman)
- [Contributing](#contributing)
- [License](#license)

## Prerequesite
Before starting: make sure that you have installed the following tools:

- PHP >= 8.0
- Composer
- MySQL (or any other database supported by Laravel)
- Laravel >= 9.0
- Node.js & NPM 


## Project installation

### 2. dependencies installation 
Go to the project directory and install all necessary dependencies:
```bash
cd jobboard-backend
composer install


```

### 3. Create a .env file: Copy the .env.example to .env and configure your database settings
```bash
cp .env.example .env
```
### Important
Remember to change the database connection variables:
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=jobboard_db
DB_USERNAME=root
DB_PASSWORD=

### 4. Generate the application key: Laravel requires an application key to be generated:
```bash
php artisan key:generate
```

### 5.Set up the database: Make sure your MySQL or database service is running, then configure the .env file with the correct database credentials.


### 6.Create differents tables of your data_base
Use this command: 
```bash
php artisan migrate:<NAME_OF_YOUR_TABLE> -mfsc
```
where m stands for model,f for factory,s dor seeder and c for controller (essential for functions for api request)

### 7.Run the migrations and seeders: This command creates the database tables and seeds with sample data:
```bash
php artisan migrate --seed

```


### Useful commands
#### Start the local development server:
```bash
php artisan serve

```

####  Run migrations (to create tables):
```bash
php artisan migrate

```
# Route and Controllers
Here is a brief overview of the routes and controllers used in this project. These routes are defined in routes/api.php.
### 1. Authentication Routes
- Register a new user:  
POST  http://127.0.0.1:8000/api/register

- Login
```bash
POST http://127.0.0.1:8000/api/login
```
- Logout(requires authentication): 
```bash
POST http://127.0.0.1:8000/api/logout
```
*Controller*: AuthController.php

### 2. Advertisement Routes
- List all advertisements

```bash
GET http://127.0.0.1:8000/api/advertisements_list
```

- Show a specific advertisement
```bash
GET http://127.0.0.1:8000/api/advertisments_show/{id}
```

- Create an advertisement
```bash
POST http://127.0.0.1:8000/api/advertisments_create

```

- Update an advertisement
```bash
PUT  http://127.0.0.1:8000/api/advertisments_update/{id}
```
- Delete an advertisement
```bash
DELETE http://127.0.0.1:8000/api/advertisments_delete/{id}
```


### 3. Companies Routes
- List all companies

```bash
GET http://127.0.0.1:8000/api/companies_list
```

- Show a specific company
```bash
GET http://127.0.0.1:8000/api/companies_show/{id}
```

- Create a company
```bash
POST http://127.0.0.1:8000/api/companies_create

```

- Update a company
```bash
PUT  http://127.0.0.1:8000/api/companies_update/{id}
```
- Delete a company
```bash

DELETE http://127.0.0.1:8000/api/companies_delete/{id}
```


### 4. User Routes
- List all users

```bash
GET http://127.0.0.1:8000/api/users_list
```

- Show a specific user
```bash
GET http://127.0.0.1:8000/api/users_show/{id}
```

- Create an user
```bash
POST http://127.0.0.1:8000/api/register

```
*It's managed by the register route in my api.php*

- Update an user
```bash
PUT  http://127.0.0.1:8000/api/users_update/{id}
```
- Delete an advertisement
```bash
DELETE http://127.0.0.1:8000/api/users_delete/{id}
```

### 5. Applications Routes
- List all applications

```bash
GET http://127.0.0.1:8000/api/applications_list
```

- Show a specific application
```bash
GET http://127.0.0.1:8000/api/applications_show/{id}
```

- Create an application
```bash
POST http://127.0.0.1:8000/api/applications_create

```

- Update an application
```bash
PUT  http://127.0.0.1:8000/api/applications_update/{id}
```
- Delete an application
```bash
DELETE http://127.0.0.1:8000/api/applications_delete/{id}
```



### 6. Unregistered users Routes
- List all  unregistered users

```bash
GET http://127.0.0.1:8000/api/unregistered_users_list
```

- Show a specific application
```bash
GET http://127.0.0.1:8000/api/unregistered_users_show/{id}
```

- Create an unregistered user
```bash
POST http://127.0.0.1:8000/api/applications_create

```
*It 's managed in application controller when a user applies for a specific ad and is not authenticated*

- Update an unregistered user
```bash
PUT  http://127.0.0.1:8000/api/unregistered_users_update/{id}
```
- Delete an unregistered user
```bash
DELETE http://127.0.0.1:8000/api/unregistered_users_delete/{id}
```
## Controller description
### Auth Controller 
- register: Registers a new user.
- login: Authenticates a user and returns a token.
- logout: Disconnects a user by invalidating the token.

### Adevertisement Controller 
- index: Gets the list of all job ads.
- show: Displays a specific ad.
- store: Creates a new ad.
- update: Updates an existing ad.
- destroy: Removes an ad.


### CompanyController
- index: Lists all companies.
- show: Displays details of a company.
- store: Creates a new business.
- update: Updates a company.
- destroy: Deletes a company.

### ApplicationController
- store: Creates an application (registered or unregistered user) and create an unregistered user if user not authenticated
- index: List all entries.
- show: Displays the details of an application.
- update: Updates an application.
- destroy: Deletes an application.

### UserController
- index: List all users.
- show: Displays a specific user.
- update: Updates a user.
- destroy: Removes a user.

### UnregisteredUserController
- index: List unregistered users 
- show: Displays details of a non-registered user.
- destroy: Removes an unregistered user.





## Authentication
This project uses Laravel Sanctum for API authentication. After registering or logging in, the user receives a token that must be sent with each authenticated request.

## Running the project
Once the dependencies are installed, the **.env** file is configured, and the database is set up, run the following command to start the development server:

```bash
php artisan serve

```
*This will start the server at http://127.0.0.1:8000, and you can begin making API requests from your frontend.*

# Error Handling and Testing API
While testing your API, you may encounter common errors. Here's how to handle them:
### 1. **401 Unauthorized**: 
This error occurs when trying to access a protected route without a valid authentication token.
- Make sure to send the Bearer token in the **Authorization** header after logging in.

-Example: (Json)
```json 
{
    "Authorization": "Bearer your_token"
}
```
### 2.**404 Not Found**: 
This happens when the requested resource (e.g., an ad or a company) is not available.
- Ensure the correct route is being called, and the resource ID exists in the database.

### 3. **422 Unprocessable Entity**:
This error usually means validation failed for the request data.
- Check the request body to ensure all required fields are present and meet the validation rules.

### 4. **500 Internal Server Error**:
This indicates a server-side issue, such as a bug in the controller or database issue.
- Check your logs (storage/logs/laravel.log) for more details on the error.

## Example API Testing with Postman
1- Register a new user:
-  POST http://127.0.0.1:8000/api/register
- Body: 
``` json
{
"first_name": "John",
"last_name": "Doe",
"email": "johndoe@example.com",
"password": "secret",
"password_confirmation": "secret"

```
2- Login and get a token::
-  POST http://127.0.0.1:8000/api/login
- Body: 
```json
{
 "email": "johndoe@example.com",
  "password": "secret"
}
```

- Save the returned token to use in subsequent API requests.

3- Accessing protected routes: After obtaining a token, you can access routes that require authentication by including the token in your headers:
```json
{
    "Authorization": "Bearer your_token"
}
```


# Jobify - JobBoard Frontend

## Prerequisites

Before you start, ensure you have installed the following tools:

- Node.js & npm (or Yarn)
- React (version >= 17.x)
- React Bootstrap (version >= 2.x)
- Axios (for API requests)
- React Router (for navigation)

## Project Setup

### 1. Install dependencies
To install all necessary dependencies for the project, run:
```bash
npm install
```
or 

```bash
yarn install
```
### 2. Start the development server

```bash
npm start
```
or 

```bash
yarn start
```
*This will start the server at http://localhost:3000.*

## Frontend Frameworks
This project uses the following main frameworks and libraries:
- **React**:A JavaScript library for building user interfaces.
- **React Boostrap**:For responsive and mobile-first front-end design.
- **Axios**:To make HTTP requests to the Laravel backend API.
- **React Router**: For handling navigation and routing in the app.

## Key Components
- **JobAdvert and JobAdvertuser**:Displays the job advertisement with title, description, and a "Learn More" button.
- **login**: A form for user authentication, integrated with the backend for login.
- **admin-dashboard**: Accessible only by admin users, allowing CRUD operations on job ads, companies, and users.

## API integration
All API requests are made using Axios. The API endpoints from the backend are consumed by the frontend. For example, to fetch a list of job advertisements:
```javascript
axios.get('http://127.0.0.1:8000/api/advertisements_list')
  .then(response => {
    setJobAds(response.data);
  })
  .catch(error => {
    console.error('There was an error fetching the job advertisements!', error);
  });

```
Ensure that your backend server is running at http://127.0.0.1:8000, or adjust the base URL accordingly.

## Styling
This project uses React Bootstrap for most of the styling. Components like buttons, modals, forms, and grids are styled using Bootstrap classes.
Example of using Bootstrap in React:
```javascript
import { Button } from 'react-bootstrap';

<Button variant="primary">Click Me</Button>

```
Ensure that you've imported the Bootstrap CSS in your index.js:
```javascript
import 'bootstrap/dist/css/bootstrap.min.css';

```
## Routes
The project uses React Router to handle page navigation. Here are some of the main routes:

- /: The home page listing all job ads.
- /login: The login page for user authentication.
- /admin: The admin page, protected and accessible only to admins.


 ## Error Handling

 In case of any error (such as a failed API call), appropriate error messages are displayed on the UI. Axios interceptors or error boundaries can be used to handle errors globally.

 ## Example API testing 
1. Fetch job advertisements:
- GET http://localhost:3000/api/advertisements_list

2.Create a job advertisement 
- POST http://localhost:3000/api/advertisements_create

Ensure you have authentication tokens for protected routes.









## Authors

- [@Megha](https://www.github.com/MeghaR21)
- [@Alain](https://www.github.com/Alain27info)

# Contributing 
If you find a bug or want to contribute to improving this project, please create a pull request or submit an issue.

# License
This project is licensed under the MIT License.



