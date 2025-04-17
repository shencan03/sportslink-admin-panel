# SportsLink Admin Panel

This is the admin panel for the SportsLink mobile application. It allows administrators to monitor and moderate the mobile app, manage users and events, handle reports, view analytics, publish news, and check system logs.

## Overview

The SportsLink app connects sports enthusiasts by allowing them to create or join sports events in their community. This admin panel provides the tools necessary to manage the platform effectively.

## Features

- **Dashboard:** Overview of key metrics and recent activities
- **User Management:** View, search, and manage user accounts
- **Event Management:** Monitor and moderate sports events
- **Reports:** Handle user-reported content and issues
- **Analytics:** Track user engagement and app performance
- **News Management:** Create and publish sports news for the mobile app
- **Activity Logs:** Monitor admin actions for accountability
- **Admin Profiles:** Manage admin accounts and permissions

## Tech Stack

### Frontend

- **Framework:** Next.js / React.js (App Router)
- **Styling:** Tailwind CSS / shadcn
- **Form Management:** React Hook Form + Zod
- **API Communication:** Axios
- **State Management:** Zustand
- **Charts:** Recharts
- **Icons:** React Icons

### Backend

- **Server:** Node.js + Express.js
- **Database:** Supabase, PostgreSQL
- **Authentication:** Supabase Auth
- **Storage:** Supabase Storage
- **API Documentation:** Swagger

## Getting Started

### Prerequisites

- Node.js (v18 or newer)
- npm or yarn
- Git

### Installation

1. Clone the repository

```bash
git clone https://github.com/your-username/sportslink-admin-panel.git
cd sportslink-admin-panel
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Set up environment variables

```
# Create a .env.local file in the root directory
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

4. Start the development server

```bash
npm run dev
# or
yarn dev
```

5. Open your browser and navigate to http://localhost:3000

## Project Structure

```
sportslink-admin-panel/
├── src/
│   ├── app/               # Next.js app router pages
│   ├── components/        # React components (Atomic Design)
│   │   ├── atoms/         # Smallest UI elements
│   │   ├── molecules/     # Groups of atoms
│   │   ├── organisms/     # Complex components
│   │   ├── templates/     # Page layouts
│   │   └── pages/         # Page components
│   ├── hooks/             # Custom React hooks
│   ├── services/          # API and external services
│   ├── store/             # Zustand state management
│   └── utils/             # Helper functions
├── public/                # Static assets
└── ...                    # Config files
```

## Development Workflow

1. Pull the latest changes from the main branch
2. Create a new feature branch from main
3. Implement your changes
4. Write tests for your code
5. Submit a pull request for review
6. After approval, merge into the main branch

## Contributing

Please read the [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is proprietary and confidential.

## Acknowledgments

- The SportsLink development team
- All contributors who have helped shape this admin panel
