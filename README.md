# Getting Started with Create React App

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

### `Approach taken & comments`

This project was rapidly built within the space of around 3 hours. If this was a large scale project, then each and every feature would have been built individually and tested properly. For example the hook that was created to fetch the characters would have been one story and pointed and executed accordingly. The Modal may have been another small story. In fact the creation and setup of the project may have been another story. 

I decided to go for tailwind css, because that is something that I have been actively trying to learn in my spare time and I have found that it is rapid to use and also because it has predefined breakpoints to accomodate for screen size. In the time that I had available to me, I felt this was the best option

I used react testing library for testing because I find it is the simplest way to test react components and also because the other popular alternative, enzyme, is now deprecated. 

I decided against any heavy state management because this is a simple application with a few components so something like redux would not have been appropriate.

There could have been a few improvements I could have made but I just ran out of time. For example the use of react hooks would mean that I didnt need to prop drill, I could have referenced the hook in the component instead. Also, I did not test a few components which should have been tested because of time constraints.