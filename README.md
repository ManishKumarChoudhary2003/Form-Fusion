# Form Fusion

## Description
Form Fusion is a comprehensive application built using Spring Boot, designed to manage forms, responses, and users effectively.
It provides a user-friendly interface for creating, updating, and deleting forms, as well as fetching responses and managing users securely.

## Features

### Frontend Features
- Intuitive UI for form creation, management, and response retrieval.
- Responsive design for compatibility across devices.
- User authentication and authorization.
- Form validation for data integrity.
- Dynamic form rendering based on user permissions.

### Backend Features
- Create, update, and delete forms.
- Retrieve responses for specific forms.
- User management including authentication and authorization.


## Technologies Used
- **Frontend**:
  - HTML
  - CSS
  - JavaScript
  - React.js
  - Redux
  - Bootstrap 
  - Axios for HTTP requests
  
- **Backend**:
  - Java 
  - Spring Boot
  - Spring Security
  - Hibernate
  - MySql
  - Maven for dependency management

  
## Endpoints
- **POST** `/api/{userId}/{formId}/set-link`: Set the URL for a form.
- **PUT** `/api/{userId}/{formId}/update-form`: Update an existing form.
- **DELETE** `/api/{userId}/{formId}/delete-form`: Delete a form by ID.
- **DELETE** `/api/{userId}/delete-no-links`: Delete forms with no links associated with a user.
- **GET** `/api/{userId}/all-forms`: Fetch all forms for a user.
- **GET** `/api/{userId}/{formId}/get-responses`: Fetch responses for a specific form and user.


  
## Installation
To run Form Fusion locally, follow these steps:

1. Clone the repository: `git clone https://github.com/example/repository.git`
2. Navigate to the project directory: `cd project-directory`
3. Build the project: `./gradlew build`
4. Run the project: `./gradlew bootRun`

## Usage
1. Access the application through the provided endpoints.
2. Use the intuitive user interface to perform CRUD operations on forms, responses, and users.
3. Ensure proper authentication and authorization for secure access to sensitive functionalities.




