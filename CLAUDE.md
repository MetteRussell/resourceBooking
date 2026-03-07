# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm start` - Run the React app at http://localhost:3000
- `npm run start:server` - Start JSON Server API at http://localhost:3005
- `npm run build` - Build for production to the `build` folder
- `npm test` - Run tests in interactive watch mode

### Database
For PostgreSQL development (if needed):
```bash
docker run -itd -e POSTGRES_USER=my_user -e POSTGRES_PASSWORD=root -p 5432:5432 --name postgresql postgres
PGPASSWORD=root psql -h localhost -p 5432 -U my_user
```

## Architecture

This is a Resource Booking System built with React and Redux Toolkit. The application allows users to book equipment/materials with date reservations.

### Key Components

**Frontend State Management**: Uses Redux Toolkit with RTK Query for API calls. The store is configured in `src/store/index.js` with four main API slices:
- `userApi` - User authentication and management
- `materialsApi` - User's selected materials
- `materialAllsApi` - Complete equipment catalog
- `reservedDateApi` - Date bookings and reservations

**Backend**: JSON Server running on port 3005 using `db.json` as the database. In production, the API is at `http://37.27.249.201:3005`.

**Environment Configuration**: The app uses conditional configuration based on NODE_ENV:
- `src/config/keys.js` - Selects between dev and prod config
- `src/config/dev.js` - Development API URL (localhost)
- `src/config/prod.js` - Production API URL (37.27.249.201)

**User Flow**:
1. Users enter email on login page
2. System validates/creates user account
3. Regular users see equipment selection and booking dashboard
4. Admin users (`isAdmin: true`) access user and reservation management

**Component Structure**: 
- Main app entry: `src/App.js`
- Core pages: `Login.js`, `AdminList.js`
- Material management: `MaterialsList.js`, `ReservedDatesList.js`
- Custom navigation provider in `src/components/navigation/`

### Tech Stack
- React 18 with Create React App
- Redux Toolkit + RTK Query for state and API management
- Styling: Tailwind CSS, Material-UI, React Bootstrap, Styled Components
- React Router DOM for routing
- React DatePicker for date selection
- Validator.js for email validation