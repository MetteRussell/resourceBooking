# NBV Resource Booking System

A web-based resource booking system for managing equipment and material reservations. Users can browse available equipment, make date-based reservations, and administrators can manage users and bookings.

## Features

- **User Management**: Email-based authentication with automatic user creation
- **Equipment Catalog**: Browse available materials and equipment
- **Date Reservations**: Book resources for specific dates
- **Admin Panel**: Manage users, view all reservations, and control inventory
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Frontend**: React 18, Redux Toolkit (RTK Query), React Router
- **Styling**: Tailwind CSS, Material-UI, React Bootstrap
- **Backend**: JSON Server (development/mock API)
- **State Management**: Redux Toolkit with RTK Query
- **Date Handling**: React DatePicker
- **Build Tool**: Create React App

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd resourceBooking
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

You need to run both the React app and the JSON Server:

### Start the React Application
```bash
npm start
```
The app will open at [http://localhost:3000](http://localhost:3000)

### Start the JSON Server (Backend)
In a separate terminal:
```bash
npm run start:server
```
The API server will run at [http://localhost:3005](http://localhost:3005)

## Available Scripts

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### `npm run start:server`
Starts the JSON Server API at [http://localhost:3005](http://localhost:3005)

### `npm test`
Launches the test runner in interactive watch mode

### `npm run build`
Builds the app for production to the `build` folder

## Project Structure

For detailed architecture documentation, see [ARCHITECTURE.md](./ARCHITECTURE.md)

```
src/
├── components/     # React components
├── store/          # Redux store (RTK Query APIs)
├── hooks/          # Custom React hooks
├── config/         # Environment configuration
├── utilities/      # Helper functions
└── App.js          # Root component
```

## Configuration

The application uses environment-based configuration:
- **Development**: API points to `http://localhost:3005`
- **Production**: API points to `http://37.27.249.201:3005`

Configuration is automatically selected based on `NODE_ENV`.

## User Roles

1. **Regular Users**: Can browse materials and make reservations
2. **Administrators**: Full access to user management and all reservations

Admin access is determined by the `isAdmin` flag in the user record.

## Database

The application currently uses JSON Server as a mock backend with `db.json` as the database file. This provides a simple REST API for development and testing.

The `db.json` file contains:
- **users**: User accounts with email and admin status
- **allMaterials**: Complete catalog of available equipment
- **materials**: User-specific material selections
- **reservedDates**: Date-based resource bookings

**Note**: JSON Server is intended for development/prototyping. For production use, consider migrating to a real database solution.

## Deployment

For production deployment using Docker and Nginx Proxy Manager, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## Development

For development guidance when using Claude Code, refer to [CLAUDE.md](./CLAUDE.md)

## License

This project is private and proprietary.