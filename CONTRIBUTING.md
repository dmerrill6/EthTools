# Contributing

Before adding new code, please understand the project structure thoroughly.

## Structure

The app was created using [create-react-app](https://github.com/facebook/create-react-app).
It has the following architecture:

### Components

Components are dummy. They don't directly modify the store or access it. They just know
how to represent data and when certain actions trigger a callback.

### Containers

Containers orchestrate the components. They connect to the store to get the data,
they provide the data to the components, and modify the store when the components
announce a user interaction.

### Views

Views just render containers together in a single page.

### Redux's actions, reducers and selectors

Redux manages the data layer. Actions trigger changes. Reducers process actions and
tie them together into the store. Selectors feed the data into the containers.
Standard stuff to make sure that data is decoupled from implementations.

## How to contribute

To contribute with new code, you must fork the repo, commit your changes in the fork, and then
send an upstream Pull Request towards develop branch. If you constantly make good quality contributions you will get write access to this repo
 and be an official maintainer.

## Pull Request acceptance requirements

1- Code complies with the project structure.

2- Complies with the linter.

3- Code is tested.
