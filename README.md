# Simple weather app

This project communicates with [OpenWeatherMap API](https://openweathermap.org/) to display basic weather data.

## Available routes

- `/` - the root route, it displays a basic dashboard with temparatures for default locations (London and Berlin) and one selected by user
- `location/:place` - more detailed weather data for the selected location

## How to run?

You will need `node` and package manager (preferably `yarn`, but you can use `npm` as well) installed.
For security reason I do not store API key for OpenWeatherMap API. Either contact me to obtain one or use your own key (OpenWeatherMap API provides a free plan, so you just need to create an account).

Steps:

1. Edit `REACT_APP_OPEN_WEATHER_API_KEY` variable in `.env` file:
```
REACT_APP_OPEN_WEATHER_API_KEY=MY_KEY
```
2. Install dependencies: `yarn install`
3. Runs the app in the development mode: `yarn start`

## Stack

- Typesscript
- React
- Material UI (to get some decent look out-of-the-box)
- React Router
- Cypress (for automated testing)

## TODOS

- replace raw strings in reducers actions with TS enums or string literal union
- more tests
- better error handling
- use localStorage to retrieve data from there for the initial load

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn cypress:open`

Launches [Cypress](https://www.cypress.io/) dashboard, where you can run automated tests.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

Ejects the project from CRA.
