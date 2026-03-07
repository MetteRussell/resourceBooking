# NBV Resource Booking System - Architecture

## System Overview

```mermaid
graph TB
    subgraph "Frontend (React)"
        A[App Component] --> B[Login Page]
        A --> C[Admin Panel]
        B --> D[User Dashboard]
        D --> E[Material Selection]
        D --> F[Date Booking]
        C --> G[User Management]
        C --> H[Reservation Management]
    end
    
    subgraph "State Management (Redux)"
        I[Redux Store] --> J[User API Slice]
        I --> K[Material API Slice]
        I --> L[Reservation API Slice]
        I --> M[Material All API Slice]
    end
    
    subgraph "Backend"
        N[JSON Server :3005] --> O[db.json]
    end
    
    subgraph "Configuration"
        P[Environment Config] --> Q[Dev Config]
        P --> R[Prod Config]
    end
    
    Frontend --> I
    I --> N
    P --> Frontend
```

## Component Architecture

```mermaid
graph LR
    subgraph "Core Components"
        A[App.js] --> B[Login.js]
        A --> C[AdminList.js]
        B --> D[UsersListItem.js]
        C --> E[MaterialsList.js]
        C --> F[ReservedDatesList.js]
        C --> AF[AdminReservedDatesList.js]
    end
    
    subgraph "List Item Components"
        D[UsersListItem.js]
        ML[MaterialsListItem.js]
        RDL[ReservedDatesListItem.js]
        AL[AdminListItem.js]
        ARL[AdminReservedDatesListItem.js]
    end
    
    subgraph "UI Components"
        G[Button.js]
        H[Skeleton.js]
        I[DatepickerDialog.js]
        J[Route.js]
        P[Panel.js]
        EP[ExpandablePanel.js]
        MD[MaterialDialog.js]
    end
    
    subgraph "Navigation"
        K[Navigation Provider]
        L[Link.js]
    end
    
    B --> G
    B --> H
    C --> G
    C --> H
    C --> AL
    E --> ML
    E --> MD
    F --> RDL
    F --> I
    AF --> ARL
    A --> J
    A --> K
    D --> L
    C --> P
    C --> EP
```

## Data Flow Architecture

```mermaid
sequenceDiagram
    participant U as User
    participant L as Login Component
    participant S as Redux Store
    participant API as JSON Server API
    participant DB as db.json
    
    U->>L: Enter Email
    L->>S: Validate User (RTK Query)
    S->>API: GET /users
    API->>DB: Read users
    DB-->>API: Return user data
    API-->>S: User response
    S-->>L: User validation result
    
    alt User exists
        L->>L: Show user dashboard
        L->>S: Fetch materials (RTK Query)
        S->>API: GET /allMaterials
        API->>DB: Read materials
        DB-->>API: Materials data
        API-->>S: Materials response
        S-->>L: Display materials
    else New user
        L->>S: Create user (RTK Mutation)
        S->>API: POST /users
        API->>DB: Add new user
        DB-->>API: User created
        API-->>S: Success response
        S-->>L: User created, show dashboard
    end
```

## Redux Store Architecture

The application uses Redux Toolkit with RTK Query for all state management. There are no traditional Redux slices - all state is managed through RTK Query APIs.

### Custom Hooks
- `use-navigation.js` - Custom hook for navigation context
- `useThunk.js` - Hook for dispatching thunk actions

## API Architecture

```mermaid
graph TB
    subgraph "RTK Query APIs (No Traditional Slices)"
        A[materialAllsApi] --> A1[fetchMaterialAlls]
        B[userApi] --> B1[fetchUsers]
        B --> B2[addUser]
        B --> B3[removeUser]
        C[materialsApi] --> C1[fetchMaterials]
        C --> C2[addMaterial]
        C --> C3[removeMaterial]
        D[reservedDateApi] --> D1[fetchReservedDates]
        D --> D2[addReservedDate]
        D --> D3[removeReservedDate]
    end
    
    subgraph "JSON Server Endpoints"
        E["/allMaterials"] --> F[Equipment Catalog]
        G["/users"] --> H[User Management]
        I["/materials"] --> J[User Materials]
        K["/reservedDates"] --> L[Bookings]
    end
    
    A1 --> E
    B1 --> G
    B2 --> G
    B3 --> G
    C1 --> I
    C2 --> I
    C3 --> I
    D1 --> K
    D2 --> K
    D3 --> K
```

## User Flow Diagram

```mermaid
graph TD
    A[User Visits Site] --> B{Valid Email?}
    B -->|No| C[Show Email Validation Error]
    B -->|Yes| D{User Exists?}
    D -->|No| E[Create New User]
    D -->|Yes| F{Is Admin?}
    E --> G[Show User Dashboard]
    F -->|Yes| H[Show Admin Panel]
    F -->|No| G
    
    G --> I[View Available Materials]
    I --> J[Select Material]
    J --> K[Choose Date]
    K --> L[Create Reservation]
    
    H --> M[Manage Users]
    H --> N[View All Reservations]
    H --> O[Manage Materials]
```

## Technology Stack

```mermaid
graph TB
    subgraph "Frontend Stack"
        A[React 18]
        B[Redux Toolkit]
        C[RTK Query]
        D[React Router DOM]
        E[Tailwind CSS]
        F[Material-UI]
        G[React Bootstrap]
        H[Styled Components]
    end
    
    subgraph "Development Tools"
        I[Create React App]
        J[React Scripts]
        K[PostCSS]
        L[Autoprefixer]
    end
    
    subgraph "Backend/Data"
        M[JSON Server]
        N[db.json]
        O[Axios]
    end
    
    subgraph "Utilities"
        P[Validator.js]
        Q[React DatePicker]
        R[React Icons]
        S[Faker.js]
    end
    
    A --> B
    B --> C
    A --> D
    A --> E
    A --> F
    A --> G
    A --> H
    A --> I
    I --> J
    E --> K
    K --> L
    C --> O
    O --> M
    M --> N
    A --> P
    A --> Q
    A --> R
    A --> S
```

## Deployment Architecture

```mermaid
graph LR
    subgraph "Development"
        A[localhost:3000] --> B[React Dev Server]
        C[localhost:3005] --> D[JSON Server]
    end
    
    subgraph "Production"
        E[Frontend Build] --> F[Static Files]
        G[37.27.249.201:3005] --> H[JSON Server API]
    end
    
    subgraph "Configuration"
        I[dev.js] --> A
        J[prod.js] --> G
        K[keys.js] --> I
        K --> J
    end
    
    B --> D
    F --> H
```

## File Structure

```
src/
├── components/              # React components
│   ├── navigation/         # Navigation provider
│   │   └── Navigation.js
│   ├── Login.js            # User authentication
│   ├── AdminList.js        # Admin dashboard
│   ├── AdminListItem.js    # Admin list items
│   ├── AdminReservedDatesList.js
│   ├── AdminReservedDatesListItem.js
│   ├── MaterialsList.js    # Equipment catalog
│   ├── MaterialsListItem.js
│   ├── MaterialDialog.js   # Material selection dialog
│   ├── ReservedDatesList.js
│   ├── ReservedDatesListItem.js
│   ├── UsersListItem.js
│   ├── DatepickerDialog.js # Date picker component
│   ├── Panel.js            # Panel wrapper
│   ├── ExpandablePanel.js  # Expandable panel
│   ├── Button.js           # Reusable button
│   ├── Skeleton.js         # Loading skeleton
│   ├── Route.js            # Route component
│   └── Link.js             # Navigation link
├── store/                  # Redux store (RTK Query only)
│   ├── apis/              # RTK Query API definitions
│   │   ├── materialAllsApi.js
│   │   ├── materialsApi.js
│   │   ├── reservedDateApi.js
│   │   └── userApi.js
│   └── index.js           # Store configuration
├── hooks/                 # Custom hooks
│   ├── use-navigation.js  # Navigation context hook
│   └── useThunk.js        # Thunk dispatch hook
├── config/                # Environment config
│   ├── keys.js            # Config selector
│   ├── dev.js             # Development settings
│   └── prod.js            # Production settings
├── utilities/             # Helper functions
│   └── dateFunctions.js   # Date utilities
└── App.js                 # Root component
```