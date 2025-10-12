# Drawer Component

A flexible, responsive drawer component built on top of [Vaul](https://github.com/emilkowalski/vaul) that provides slide-in panels from any direction with mobile-optimized behavior.

## Features

- ✅ **Multi-directional**: Slide from top, bottom, left, or right
- ✅ **Responsive**: Automatic mobile handle for bottom drawers
- ✅ **Flexible sizing**: Predefined widths (sm, md, lg, xl) or full-screen
- ✅ **Accessible**: Built-in keyboard navigation and ARIA labels
- ✅ **Customizable**: Optional title, close button, and custom styling
- ✅ **Mobile-optimized**: Non-directional shadow works on all orientations

## Basic Usage

```tsx
import { Drawer } from '@repo/confetti-design-system'

function MyComponent() {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} title="My Drawer">
			<div className="p-4">
				<p>Drawer content goes here</p>
			</div>
		</Drawer>
	)
}
```

## Props

| Prop                  | Type                                     | Default      | Description                             |
| --------------------- | ---------------------------------------- | ------------ | --------------------------------------- |
| `isOpen`              | `boolean`                                | **required** | Controls drawer visibility              |
| `onClose`             | `() => void`                             | **required** | Callback when drawer closes             |
| `title`               | `string`                                 | `undefined`  | Optional title shown in header          |
| `children`            | `React.ReactNode`                        | **required** | Drawer content                          |
| `className`           | `string`                                 | `''`         | Additional classes for content wrapper  |
| `direction`           | `'top' \| 'bottom' \| 'left' \| 'right'` | `'right'`    | Direction drawer slides from            |
| `width`               | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'`       | Drawer size                             |
| `showCloseButton`     | `boolean`                                | `true`       | Show close button in header             |
| `closeOnOverlayClick` | `boolean`                                | `true`       | Close when clicking overlay             |
| `closeOnEscape`       | `boolean`                                | `true`       | Close when pressing Escape key          |
| `showMobileHandle`    | `boolean`                                | `false`      | Show drag handle (bottom drawers only)  |
| `contentClassName`    | `string`                                 | `''`         | Additional classes for drawer container |

## Width Sizes

| Size   | Horizontal (left/right) | Vertical (top/bottom) |
| ------ | ----------------------- | --------------------- |
| `sm`   | 320px (w-80)            | 320px (h-80)          |
| `md`   | 384px (w-96)            | 384px (h-96)          |
| `lg`   | 448px (w-[28rem])       | 448px (h-[28rem])     |
| `xl`   | 512px (w-[32rem])       | 512px (h-[32rem])     |
| `full` | 100% width              | 100% height           |

## Examples

### Responsive Drawer (Desktop: Right, Mobile: Bottom)

```tsx
import { useMediaQuery } from '../../hooks/use-media-query'

function ResponsiveDrawer() {
	const [isOpen, setIsOpen] = useState(false)
	const isDesktop = useMediaQuery('(min-width: 768px)')

	return (
		<Drawer
			isOpen={isOpen}
			onClose={() => setIsOpen(false)}
			title="Responsive Drawer"
			direction={isDesktop ? 'right' : 'bottom'}
			width={isDesktop ? 'lg' : 'full'}
			showCloseButton={isDesktop}
			showMobileHandle={!isDesktop}
			contentClassName={isDesktop ? 'w-[500px]' : 'rounded-t-[10px] h-[96%] mt-24'}
		>
			<div className="p-4">
				<p>Content adapts to screen size</p>
			</div>
		</Drawer>
	)
}
```

### Form Drawer with Custom Styling

```tsx
function FormDrawer() {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<Drawer
			isOpen={isOpen}
			onClose={() => setIsOpen(false)}
			title="Add New Item"
			direction="right"
			width="lg"
			className="p-6"
		>
			<form className="space-y-4">
				<input type="text" placeholder="Name" className="w-full px-3 py-2 border rounded" />
				<textarea placeholder="Description" className="w-full px-3 py-2 border rounded" rows={4} />
				<div className="flex gap-3">
					<button type="button" onClick={() => setIsOpen(false)} className="btn btn-secondary">
						Cancel
					</button>
					<button type="submit" className="btn btn-primary">
						Submit
					</button>
				</div>
			</form>
		</Drawer>
	)
}
```

### Full-Screen Drawer

```tsx
function FullScreenDrawer() {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<Drawer
			isOpen={isOpen}
			onClose={() => setIsOpen(false)}
			direction="right"
			width="full"
			showCloseButton={true}
		>
			<div className="p-8">
				<h1>Full Screen Content</h1>
				<p>Takes up entire viewport</p>
			</div>
		</Drawer>
	)
}
```

### Bottom Drawer with Mobile Handle

```tsx
function MobileDrawer() {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<Drawer
			isOpen={isOpen}
			onClose={() => setIsOpen(false)}
			direction="bottom"
			width="full"
			showMobileHandle={true}
			showCloseButton={false}
			contentClassName="rounded-t-[10px] h-[80%]"
		>
			<div className="p-4">
				<p>Swipe down to close</p>
			</div>
		</Drawer>
	)
}
```

### Drawer Without Header

```tsx
function CustomHeaderDrawer() {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<Drawer
			isOpen={isOpen}
			onClose={() => setIsOpen(false)}
			direction="right"
			width="md"
			showCloseButton={false}
			// No title prop = no header
		>
			<div className="p-4">
				{/* Custom header */}
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-xl font-bold">Custom Header</h2>
					<button onClick={() => setIsOpen(false)}>Close</button>
				</div>
				<p>Content with custom header</p>
			</div>
		</Drawer>
	)
}
```

## Styling

### Content Wrapper (`className`)

Applied to the scrollable content area inside the drawer:

```tsx
<Drawer className="p-6 space-y-4">{/* Content with padding and spacing */}</Drawer>
```

### Drawer Container (`contentClassName`)

Applied to the drawer container itself for positioning and sizing:

```tsx
<Drawer contentClassName="w-[600px] rounded-l-xl">{/* Custom width and rounded corners */}</Drawer>
```

## Accessibility

The Drawer component includes:

- Proper ARIA labels for close button
- Keyboard navigation (Escape to close)
- Focus management
- Screen reader support via Vaul's built-in accessibility

## Best Practices

1. **Use responsive patterns**: Switch between side drawers (desktop) and bottom drawers (mobile)
2. **Show mobile handle**: Enable `showMobileHandle` for bottom drawers on mobile
3. **Appropriate sizing**: Use `lg` or `xl` for forms, `md` for simple content
4. **Close button visibility**: Hide on mobile bottom drawers, show on desktop side drawers
5. **Content padding**: Use `className="p-4"` or similar for consistent spacing

## Real-World Examples

See these files for production usage:

- [`AddElementModal.tsx`](../../../../apps/confetti-dash/src/client/components/modals/AddElementModal.tsx) - Form with AI suggestions
- [`TaskDetailModal.tsx`](../../../../apps/confetti-dash/src/client/components/TaskDetailModal.tsx) - Editable task details
- [`ElementDetailModal.tsx`](../../../../apps/confetti-dash/src/client/components/ElementsGallery/ElementDetailModal.tsx) - Complex content with images
- [`ThemeCustomizeModal.tsx`](../../../../apps/confetti-dash/src/client/components/modals/ThemeCustomizeModal.tsx) - Full-width gallery drawer

## Technical Details

- Built on [Vaul](https://github.com/emilkowalski/vaul) for smooth animations
- Uses Tailwind CSS for styling
- Non-directional shadow (`0 0 15px rgba(0, 0, 0, 0.25)`) works on all orientations
- Automatic overflow handling with `overflow-y-auto`
- Z-index: overlay at 40, drawer at 50
