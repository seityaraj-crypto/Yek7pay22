# Violet-Finance (Yek7Pay)

## Overview

Violet-Finance is a fintech platform called Yek7Pay that provides neo-banking and digital payment services. The application offers money transfers (DMT), Indo-Nepal remittance, AEPS withdrawals, Micro ATM, payment collection (UPI QR, mPOS), bill payments (BBPS), travel bookings (flights/trains), and business loans. It's built as a full-stack TypeScript application with a React frontend and Express backend.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight client-side routing)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS v4 with custom theming via CSS variables
- **UI Components**: shadcn/ui component library (New York style) with Radix UI primitives
- **Animations**: Framer Motion for page transitions and interactions
- **Build Tool**: Vite with custom plugins for Replit integration

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript (ESM modules)
- **API Pattern**: RESTful endpoints prefixed with `/api`
- **Session Management**: Express sessions with connect-pg-simple for PostgreSQL storage
- **Build**: esbuild for production bundling with selective dependency bundling

### Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` (shared between client and server)
- **Validation**: Zod schemas generated from Drizzle schemas using drizzle-zod
- **Storage Interface**: Abstract `IStorage` interface in `server/storage.ts` with in-memory implementation (ready for database upgrade)

### Project Structure
```
├── client/src/          # React frontend
│   ├── components/      # UI components including shadcn/ui
│   ├── pages/           # Route pages (home, about, terms, privacy)
│   ├── hooks/           # Custom React hooks
│   └── lib/             # Utilities and query client
├── server/              # Express backend
│   ├── routes.ts        # API route registration
│   ├── storage.ts       # Data storage interface
│   └── static.ts        # Static file serving
├── shared/              # Shared code between client/server
│   └── schema.ts        # Drizzle database schema
└── migrations/          # Drizzle migration files
```

### Path Aliases
- `@/*` → `client/src/*`
- `@shared/*` → `shared/*`
- `@assets` → `attached_assets/`

## External Dependencies

### Database
- **PostgreSQL**: Primary database (configured via `DATABASE_URL` environment variable)
- **Drizzle Kit**: Database migrations with `db:push` command

### UI/Frontend Libraries
- **Radix UI**: Full suite of accessible UI primitives (dialog, dropdown, tabs, etc.)
- **Lucide React**: Icon library
- **Embla Carousel**: Carousel/slider component
- **date-fns**: Date formatting utilities

### Backend Services
- **express-session**: Session management
- **connect-pg-simple**: PostgreSQL session store
- **express-rate-limit**: API rate limiting (available)

### Development Tools
- **Vite**: Development server with HMR
- **Replit Plugins**: Cartographer, dev banner, runtime error overlay
- **TSX**: TypeScript execution for development