# Confetti Design System

A comprehensive design system for the Confetti application, providing consistent, reusable UI components built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Atomic Design**: Components organized as atoms, molecules, and organisms
- **TypeScript**: Full type safety with comprehensive interfaces
- **Tailwind CSS v3**: Utility-first styling with custom design tokens
- **Storybook**: Interactive documentation and component playground
- **Framer Motion**: Smooth animations and micro-interactions
- **Accessibility**: WCAG 2.1 AA compliant components
- **Mobile-First**: Responsive design optimized for all devices

## 📦 Installation

```bash
# From the monorepo root
pnpm install

# Build the design system
pnpm --filter @repo/confetti-design-system build
```

## 🎯 Usage

### Import Components

```tsx
import { Button, Input } from '@repo/confetti-design-system'

function MyComponent() {
	return (
		<div>
			<Input label="Email" placeholder="Enter your email" />
			<Button variant="primary">Submit</Button>
		</div>
	)
}
```

### Import Styles

```tsx
import '@repo/confetti-design-system/styles'
```

## 🧩 Components

### Atoms (Basic Building Blocks)

- **Button**: Multiple variants, sizes, and states
- **Input**: Form inputs with labels, validation, and icons
- **Badge**: Status indicators and labels
- **Icon**: Icon wrapper component
- **Typography**: Text components with consistent styling

### Molecules (Composite Components)

- **Card**: Content containers with various layouts
- **Modal**: Dialog components with backdrop and animations
- **Dropdown**: Select components with search and filtering
- **Form Field**: Complete form field with label and validation

### Organisms (Complex Components)

- **Navigation**: Header and sidebar navigation
- **Form**: Complete form layouts with validation
- **Data Table**: Sortable and filterable data display

## 🎨 Design Tokens

The design system uses CSS custom properties for consistent theming:

```css
:root {
	/* Primary Colors */
	--color-primary: hsl(340, 35%, 68%);
	--color-primary-foreground: hsl(30, 15%, 97%);

	/* Secondary Colors */
	--color-secondary: hsl(30, 12%, 85%);
	--color-secondary-foreground: hsl(25, 8%, 25%);

	/* And many more... */
}
```

## 📚 Storybook

Launch the Storybook development server:

```bash
pnpm --filter @repo/confetti-design-system storybook
```

Build Storybook for production:

```bash
pnpm --filter @repo/confetti-design-system build-storybook
```

## 🧪 Testing

Run the test suite:

```bash
pnpm --filter @repo/confetti-design-system test
```

Run tests with UI:

```bash
pnpm --filter @repo/confetti-design-system test:ui
```

## 🏗️ Development

### Project Structure

```
src/
├── components/
│   ├── atoms/          # Basic building blocks
│   ├── molecules/      # Composite components
│   └── organisms/      # Complex components
├── styles/             # CSS and design tokens
├── utils/              # Utility functions
├── types/              # TypeScript type definitions
└── index.ts            # Main export file
```

### Adding New Components

1. Create component directory in appropriate category
2. Implement component with TypeScript interfaces
3. Add Storybook stories with examples
4. Write unit tests
5. Export from main index file
6. Update documentation

### Component Template

```tsx
import React from 'react'
import { cn } from '../../utils/cn'

export interface ComponentNameProps {
  // Props interface
}

export const ComponentName: React.FC<ComponentNameProps> = ({
  // Destructure props
}) => {
  return (
    // Component JSX
  )
}

ComponentName.displayName = 'ComponentName'
```

## 🎯 Design Principles

- **Consistency**: All components follow the same design patterns
- **Accessibility**: WCAG 2.1 AA compliance by default
- **Performance**: Optimized for fast rendering and minimal bundle size
- **Flexibility**: Easy to customize and extend
- **Documentation**: Comprehensive examples and usage guidelines

## 🤝 Contributing

1. Follow the existing component patterns
2. Add comprehensive Storybook stories
3. Include unit tests for all functionality
4. Update documentation and examples
5. Ensure accessibility compliance
6. Test across different devices and browsers

## 📄 License

This package is part of the Confetti monorepo and follows the same licensing terms.

## 🔗 Related

- [Confetti Dashboard](../confetti-dash/) - Main application
- [Confetti Database](../confetti-db/) - Database layer
- [Confetti UI](../confetti-ui/) - Legacy UI components (deprecated)
