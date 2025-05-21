# Student Flow UI

A modern student management application built with React, TypeScript, and Shadcn UI components. This application provides an intuitive interface for managing student data, including viewing, adding, editing, and searching student records.

## Features

- **Student Management**: Add, edit, and view student information
- **Search Functionality**: Quickly find students by name or other criteria
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Built with Shadcn UI components for a clean, consistent interface

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI (Radix UI primitives)
- **Routing**: React Router DOM
- **Form Handling**: React Hook Form with Zod validation
- **API Communication**: Axios
- **Build Tool**: Vite

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository

```bash
git clone <repository-url>
cd student-flow-ui
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

## Development

Start the development server:

```bash
npm run dev
# or
yarn dev
```

This will start the Vite development server, typically at http://localhost:5173

## Building for Production

Create a production build:

```bash
npm run build
# or
yarn build
```

Preview the production build:

```bash
npm run preview
# or
yarn preview
```

## Project Structure

```
student-flow-ui/
├── public/              # Static assets
├── server/              # Backend server code
│   ├── controllers/     # API controllers
│   ├── models/          # Data models
│   └── routes/          # API routes
├── src/
│   ├── components/      # React components
│   │   └── ui/          # Shadcn UI components
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions and API clients
│   ├── pages/           # Page components
│   └── types/           # TypeScript type definitions
└── ...configuration files
```

## Backend Integration

The application connects to a Node.js backend server located in the `server/` directory. The server provides API endpoints for student data management.

To start the backend server:

```bash
cd server
npm install
npm start
```

## Configuration

The application uses TypeScript for type safety. Configuration files include:

- `tsconfig.json`: Main TypeScript configuration
- `tsconfig.app.json`: Application-specific TypeScript settings
- `tsconfig.node.json`: Node-specific TypeScript settings
- `vite.config.ts`: Vite bundler configuration
- `tailwind.config.ts`: Tailwind CSS configuration
- `components.json`: Shadcn UI components configuration

## License

[MIT](LICENSE)