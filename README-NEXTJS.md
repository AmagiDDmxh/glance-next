# Glance Dashboard - Next.js Monorepo

This is a modern rewrite of the Glance dashboard using Next.js and a monorepo structure.

## Project Structure

```
glance/
├── apps/
│   ├── web/                 # Next.js frontend application
│   └── server/              # Hono backend API server
├── packages/
│   ├── shared/              # Shared TypeScript types and interfaces
│   ├── ui/                  # React component library
│   └── config/              # Configuration utilities
├── config/
│   └── glance.yml           # Dashboard configuration file
├── package.json             # Root package.json with workspaces
└── turbo.json               # Turborepo configuration
```

## Getting Started

### Prerequisites

- bun

### Installation

1. Install dependencies:

```bash
bun install
```

2. Build shared packages:

```bash
bun run build
```

3. Start the development servers:

For the backend API:

```bash
cd apps/server
bun run dev
```

For the frontend:

```bash
cd apps/web
bun run dev
```

Or start both from the root:

```bash
bun run dev
```

## Configuration

The dashboard is configured via the `config/glance.yml` file. This file defines:

- Server settings
- Authentication
- Theme configuration
- Branding
- Pages and widgets

## Development

### Adding New Widgets

1. Add the widget type to `packages/shared/src/index.ts`
2. Create a widget handler in `apps/server/src/widgets/`
3. Create a React component in `apps/web/components/ui/widgets/`
4. Register the component in `apps/web/components/ui/utils/widgetRegistry.ts`

### Building for Production

```bash
bun run build
```

This will build all packages and applications.

## API Endpoints

- `GET /api/config` - Get configuration
- `GET /api/pages` - Get all pages
- `GET /api/pages/:slug` - Get specific page
- `GET /api/widgets/:id` - Get widget data
- `POST /api/auth/login` - User authentication

## Widget Types

The dashboard supports various widget types:

- RSS feeds
- Reddit posts
- Weather information
- Market data
- Calendar
- Clock
- Bookmarks
- Todo lists
- And many more...

## Technologies Used

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Hono, Node.js, TypeScript
- **Build System**: Turborepo
- **Package Management**: npm workspaces

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the same license as the original Glance project.
