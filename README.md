# JWT Secure Login

This project is a authentication system that uses JWT (JSON Web Tokens) to securely manage user login and authentication in your app. It allows users to sign up, log in, and access secure pages, all while keeping their data safe with JWT tokens.

## Features

- **Sign Up**: Users can create a new account by providing their name, email, and password. The password is safely stored after being hashed.
- **Log In**: Users can log in using their email and password. If the login is successful, they get a JWT token that they can use to access protected pages.
- **Protected Pages**: Some pages are only accessible if the user has a valid JWT token.

## Technologies Used

- **Backend**: Node js , Express.js 
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Password Encryption**: bcrypt

## Token Expiry

The JWT tokens used in this project are configured to expire after **12 hours**. This helps ensure that tokens are only valid for a limited period, enhancing security by requiring users to log in again after the token expires.


## API Endpoints
### `/signup` [GET]
- **Description**: This route will render the sign-up page (EJS view) where users can input their name, email, and password.
- **Response**: Renders the `signup.ejs` page.
    "email": "name@example.com",
    "password": "password123"
  }
### `/auth/signup` [POST]
- **Description**: This route will handle the logic for signing up (creating a user). It processes the form submission from `/signup` and creates a new user in the database.
  
### `/login` [GET]
- **Description**: This route will render the login page (EJS view) where users can input their email and password.
- **Response**: Renders the `login.ejs` page.

### `/auth/login` [POST]
- **Description**: This route will handle the logic for logging in a user. It processes the form submission from `/login`, checks if the user exists, compares the password, and returns a JWT token if successful.

