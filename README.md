# Registry Template

A Next.js template for creating your own component registry compatible with the `shadcn` CLI. This allows you to distribute custom components, hooks, pages, and other files to any React project.

> [!IMPORTANT]  
> This template uses **Tailwind v4**. For Tailwind v3, see [registry-template-v3](https://github.com/shadcn-ui/registry-template-v3).

## Features

- 🎨 **Component Registry**: Define and distribute custom components via `registry.json`
- 🚀 **Next.js Powered**: Built on Next.js 15 with React 19
- 📦 **shadcn CLI Compatible**: All registry items work seamlessly with the `shadcn` CLI
- 🎯 **v0 Integration**: Includes "Open in v0" API integration
- 🔧 **TypeScript**: Full TypeScript support
- 🎭 **Tailwind v4**: Uses the latest Tailwind CSS v4

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm

### Installation

1. Clone this repository:
```bash
git clone <your-repo-url>
cd registry-template
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

4. Build the registry:
```bash
pnpm registry:build
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
registry-template/
├── app/                    # Next.js app directory
├── components/             # React components
├── lib/                   # Utility functions
├── public/                # Static assets
│   └── r/                # Built registry files (generated)
├── registry/              # Registry source files
│   └── new-york/         # Style variant
│       ├── blocks/       # Custom components
│       └── ui/          # UI components
├── registry.json         # Registry configuration
└── package.json
```

## Available Components

### UI Components
- **Avatar** - Display user avatars with fallback support
- **Button** - Versatile button component with variants
- **Card** - Container component for content sections
- **Dropdown Menu** - Contextual menu triggered by a button
- **Input** - Form input field component
- **Label** - Form label component
- **Tabs** - Tabbed interface component
- **Textarea** - Multi-line text input component

### Custom Components
- **TweakCN Theme Provider** - Theme provider integrating TweakCN themes with next-themes
- **TweakCN Theme Picker** - Dropdown menu for selecting and previewing TweakCN themes

## How It Works

1. **Registry Definition**: Components are defined in `registry.json` with metadata, dependencies, and file paths.

2. **Building**: The `shadcn build` command processes the registry and generates static JSON files in `public/r/[name].json`.

3. **Serving**: Registry items are served as static files and can be accessed via the route handler.

4. **Usage**: Other projects can use your registry by configuring the `shadcn` CLI to point to your registry URL.

## Using This Registry

To use this registry in your project, configure the `shadcn` CLI:

```bash
npx shadcn@latest init --registry https://your-domain.com
```

Or add it to your `components.json`:

```json
{
  "registry": "https://your-domain.com"
}
```

## Development

### Adding New Components

1. Create your component files in `registry/new-york/ui/` or `registry/new-york/blocks/`
2. Add the component definition to `registry.json`
3. Run `pnpm registry:build` to rebuild the registry
4. Test locally before deploying

### Building for Production

```bash
pnpm build
pnpm registry:build
```

### Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build Next.js application
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm registry:build` - Build the component registry

## Deployment

This template can be deployed to any platform that supports Next.js:

- **Vercel** (recommended): Connect your repository for automatic deployments
- **Netlify**: Configure build command as `pnpm build && pnpm registry:build`
- **Self-hosted**: Build and serve the static files

Make sure to run `registry:build` as part of your build process to generate the registry JSON files.

## Documentation

For more information about creating and managing registries, visit the [shadcn documentation](https://ui.shadcn.com/docs/registry).

## License

This project is open source and available under the [MIT License](LICENSE).
