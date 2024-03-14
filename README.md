# fd-nextjs-exercise

## Project Structure and Design Assumptions

This project is a Next.js application built with TypeScript and styled using Tailwind CSS. It follows a structured approach to component organization, dividing them into atoms, molecules, and organisms, which is a concept from Atomic Design methodology.

The `src/app` directory contains the main application logic. The `api` subdirectory contains functions for API calls, while the `statistics` and `products` subdirectories contain specific logic related to these domains.

The `src/components` directory is divided into `atoms`, `molecules`, and `organisms`, representing increasing levels of complexity. Atoms are the smallest, simplest components, like buttons or text elements. Molecules are slightly more complex, combining multiple atoms into a single component. Organisms are complex components composed of many atoms and molecules.

The `src/lib` directory contains constants used across the application, while `src/types` contains TypeScript type definitions.

## Running the Application

To run the application, follow these steps:

1. Install dependencies:

```sh
yarn
```

2. Start the development server:

```sh
yarn dev
```
3.To build the application for production, run:

```sh
yarn build
```

4.To start the application in production mode, run:

```sh
yarn start
```