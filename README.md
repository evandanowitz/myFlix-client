# myFlix

## Description

**myFlix** is a single-page application (SPA) built using **React**. It is designed for users to explore, learn about, and enjoy their favorite movies. Users have the ability to scroll through all movies in the database, view detailed information about each movie, personalize a list of their favorite movies that is stored in their Profile, and also manage their account.

## Application Features

- Display a list of all movies from API
- Display detailed information about each individual movie such as Title, Description, Genre, Director, etc.
- Ability for users to add and/or remove movies from the Favorite Movies list.
- Ability for users to manage their profile in ways such as viewing current user info, updating user info, and deleting their account.
- Functionality allowing users to filter through movies by typing in a Search Bar
- Dynamic navigation between UI components

## Access the Hosted Site

Click [here](https://myflixdbapp.netlify.app/) to visit the application online.

## Testing Locally with Parcel

**Step 1.** Clone the project repository in GitHub:

- [Project Repository](https://github.com/evandanowitz/myFlix-client.git)

**Step 2.** In your CLI, run the following command to navigate to the project directory:

- `cd myflix-client`

**Step 3.** In your CLI, run the following command to ensure that Parcel is installed globally:

- `npm install -g parcel`

**Step 4.** In your CLI, run the following command to start the development server:

- `parcel src/index.html`

**Step 5.** In your browser, navigate to the following URL to access the application locally.

- https://localhost:1234/

## Technologies

- [React](https://react.dev/)
- [React DOM](https://react.dev/reference/react-dom)
- [React Bootstrap](https://react-bootstrap.netlify.app/)
- [React Router](https://reactrouter.com/en/main)
- [PropTypes](https://legacy.reactjs.org/docs/typechecking-with-proptypes.html)
- [Parcel](https://parceljs.org/docs/)

## Dependencies

- bootstrap: ^5.3.2
- mongodb: ^6.4.0
- prop-types: ^15.8.1
- react: ^18.2.0
- react-bootstrap: ^2.10.0
- react-dom: ^18.2.0
- react-router: ^6.22.0
- react-router-dom: ^6.22.3

## Developer Dependencies

- @parcel/transformer-sass: ^2.12.0
- parcel: ^2.12.0
- process: ^0.11.10

## Server-Side (backend) API

myFlix interacts with [myFlix API](https://github.com/evandanowitz/movie_api.git), a custom API that contains all data relevant to the myFlix app, including information about movies, titles, descriptions, genres, directors, images, features, users, and more. Please refer to the API Documentation above for information on API endpoints and data formats.

## Components

- **MainView**: Parent component serving as the "main" component where child components will render
- **NavigationBar**: One way that users can dynamically navigate to different page views based on authentication status and click events
- **LoginView**: User authentication takes place when user inputs credentials to access profile
- **SignupView**: Handles user registration
- **ProfileView**: Where users can view their account info, update user info, view favorite movies, and delete their account
- **MovieView**: Displays detailed information above the individual movie that was opened/clicked. Users have ability to add or remove from Favorite Movies list
- **MovieCard**: Displays list of all movies (filtered or not)
