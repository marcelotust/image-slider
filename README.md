## Author

- Linkedin - [Marcelo Tust](https://www.linkedin.com/in/marcelotust/)

## Publitas - Code Challenge - Frontend

- [Challenge Link](http://challenge.publitas.com/frontend.html)

## Setup

Basic instructions to run the project, you should enter this folder and run:

I use Vite v3.1.0 and ReactJS 18.2.0 for this project, to checkout other
library versions, please visit the package.json. I recommend you to install npm
to manage the packages.

### `npm install`

for the first run, we can check the available scripts on section below.

### Built with

- [React](https://reactjs.org/) - JS library
- [Vite](https://vitejs.dev/) - React framework

### Component

- I've created a component called ImageSlider.
- Lazy loading: This component receives an Array "imagesList" of image paths and takes care of loading those images by demand.
- Images Proportion: This component receives "width" and "height" for defining the canvas size. The loaded images will be shown fitting the aspect ratio.
- Manual and Animate Pagination: This component receives a boolean "isPaginated" that defines the behavior of the pagination. In the example received in the challenge the pagination is manual, I mean, if you release the mouse in the middle of a transition you can see half and half of each image. For me, this is not the best way to slider behavior. But as the challenge is to create based on the example, I decided to create both versions. So if you set the isPaginated={true} you can see the animated pagination, which for me is the correct behavior. Anyway, now it is a feature. You can choose which you prefer. As an example, I created 2 Sliders on App to show the differences.
- It is running and tested on the latest Chrome Browser version.

### Other points

- I've created a hook called useCanvas and a Canvas component for using canvas and some logic. In case someone wants to make a different component using canvas.

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Start the project in development mode on http://localhost:5173/

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Critique

What I would like to do if I have more time:

- add some memoization to avoid unnecessary re-renders
- check old browsers renderizations
- write automated tests
- implement storybooks to prototype components - it was helpful to define contracts and interfaces
- implement components library using storybook
- use the Lighthouse scores to improve the application
