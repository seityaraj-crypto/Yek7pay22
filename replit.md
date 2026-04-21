# Violet-Finance (Yek7Pay)

## Overview

Violet-Finance is a fintech platform called Yek7Pay that provides digital payment and financial services for agents, retailers, and merchants in India. The application offers money transfers (DMT), Indo-Nepal remittance, AEPS withdrawals, Micro ATM services, payment acceptance solutions (mPOS, UPI QR), PPI wallets, business loans, and travel booking services (flights, trains). The platform is designed to simplify financial operations and maximize profitability for its users.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight client-side routing)
- **State Management**: TanStack React Query for server state management
- **Styling**: Tailwind CSS v4 with custom theming via CSS variables
- **UI Components**: shadcn/ui component library (New York style) with Radix UI primitives
- **Animations**: Framer Motion for page transitions and micro-interactions
- **Build Tool**: Vite with custom plugins for Replit integration and meta image handling

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript (ESM modules)
- **API Pattern**: RESTful endpoints prefixed with `/api`
- **Session Management**: Express sessions with connect-pg-simple for PostgreSQL storage
- **Build**: esbuild for production bundling with selective dependency bundling for optimized cold starts
- **Payments**: Razorpay supports fixed product orders, yearly premium subscriptions with order fallback, and custom quote-based compliance payments where customers can enter any payable amount.

### Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Database**: PostgreSQL (via Neon serverless)
- **Schema Location**: `shared/schema.ts` (shared between client and server)
- **Validation**: Zod schemas generated from Drizzle schemas using drizzle-zod
- **Storage Interface**: Abstract `IStorage` interface with in-memory implementation (database-ready)

### AI Integrations
- **Chat**: OpenAI-powered chatbot with conversation persistence
- **Image Generation**: OpenAI gpt-image-1 model for image generation
- **Batch Processing**: Utility module with rate limiting and automatic retries for bulk LLM operations

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
│   ├── db.ts            # Database connection (Neon PostgreSQL)
│   └── replit_integrations/  # AI service integrations
│       ├── chat/        # Chatbot routes and storage
│       ├── image/       # Image generation routes
│       └── batch/       # Batch processing utilities
├── shared/              # Shared code between client/server
│   └── schema.ts        # Drizzle database schema
└── migrations/          # Drizzle migration files
```

## External Dependencies

### Database
- **PostgreSQL**: Primary database via Neon serverless driver (@neondatabase/serverless)
- **Drizzle ORM**: Schema management and query building
- **connect-pg-simple**: Session storage in PostgreSQL

### AI Services
- **OpenAI API**: Powers chatbot and image generation features
- Configured via `AI_INTEGRATIONS_OPENAI_API_KEY` and `AI_INTEGRATIONS_OPENAI_BASE_URL` environment variables

### Third-Party Libraries
- **p-limit / p-retry**: Rate limiting and retry logic for external API calls
- **Framer Motion**: Animation library for UI transitions
- **Radix UI**: Accessible UI primitives for component library
- **TanStack React Query**: Server state synchronization

### Environment Variables Required
- `DATABASE_URL`: PostgreSQL connection string
- `AI_INTEGRATIONS_OPENAI_API_KEY`: OpenAI API key for chat/image features
- `AI_INTEGRATIONS_OPENAI_BASE_URL`: OpenAI API base URL