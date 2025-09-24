import React from 'react'

import { Badge } from './atoms/Badge'
import { Button } from './atoms/Button'
import { Checkbox } from './atoms/Checkbox'
import { DatePicker } from './atoms/DatePicker'
import { EmailInput } from './atoms/EmailInput'
import { FeatureList } from './atoms/FeatureList'
import { Icon } from './atoms/Icon'
import { Input } from './atoms/Input'
import { NumberInput } from './atoms/NumberInput'
import { PasswordInput } from './atoms/PasswordInput'
import { ProgressBar } from './atoms/ProgressBar'
import { RadioButton } from './atoms/RadioButton'
import { SearchInput } from './atoms/SearchInput'
import { Select } from './atoms/Select'
import { StatusBadge } from './atoms/StatusBadge'
import { TextArea } from './atoms/TextArea'
import { TextInput } from './atoms/TextInput'
import { Card, CardContent, CardFooter, CardHeader } from './molecules/Card'
import { PartyCard } from './molecules/PartyCard'
import { ProgressStep } from './molecules/ProgressStep'
import { ProgressStepper } from './molecules/ProgressStepper'
import { TimelineDemo } from './TimelineDemo'
import { PartySelectionLayout } from './organisms/PartySelectionLayout'
import { PartySelector } from './organisms/PartySelector'
import { ProgressTracker } from './organisms/ProgressTracker'
import { ThemeSelectionHeader } from './organisms/ThemeSelectionHeader'

import type { ProgressStepperStep } from './molecules/ProgressStepper'
import type { PartyOption } from './organisms/PartySelector'
import type { ProgressCategory } from './organisms/ProgressTracker'

export const Demo: React.FC = () => {
        const [showProgressTracker, setShowProgressTracker] = React.useState(false)
        const [progressCategories, setProgressCategories] = React.useState<ProgressCategory[]>([
                {
                        id: 'theme-analysis',
                        name: 'Theme Analysis & Customization',
                        status: 'pending',
                        steps: [
                                {
                                        id: 'analyze-preferences',
                                        title: 'Analyzing Preferences',
                                        description: 'Processing your party style and theme preferences',
                                        status: 'pending',
                                        progress: 0,
                                        estimatedTime: '30 sec',
                                },
                                {
                                        id: 'customize-theme',
                                        title: 'Customizing Theme',
                                        description: 'Tailoring the theme to match your vision',
                                        status: 'pending',
                                        progress: 0,
                                        estimatedTime: '45 sec',
                                },
                        ],
                },
                {
                        id: 'element-generation',
                        name: 'Element Generation & AI Creation',
                        status: 'pending',
                        steps: [
                                {
                                        id: 'generate-elements',
                                        title: 'Generating Elements',
                                        description: 'Creating personalized party elements and decorations',
                                        status: 'pending',
                                        progress: 0,
                                        estimatedTime: '2 min',
                                },
                                {
                                        id: 'ai-images',
                                        title: 'AI Image Creation',
                                        description: 'Generating custom images for your party theme',
                                        status: 'pending',
                                        progress: 0,
                                        estimatedTime: '1 min',
                                },
                        ],
                },
        ])

        const stepperSteps: ProgressStepperStep[] = [
                {
                        id: 'party-type',
                        label: 'Party Type',
                        status: 'completed',
                },
                {
                        id: 'theme',
                        label: 'Theme',
                        status: 'current',
                },
                {
                        id: 'elements',
                        label: 'Elements',
                        status: 'upcoming',
                },
                {
                        id: 'details',
                        label: 'Details',
                        status: 'upcoming',
                },
                {
                        id: 'review',
                        label: 'Review',
                        status: 'upcoming',
                },
        ]

        const partyOptions: PartyOption[] = [
                {
                        id: 'birthday',
                        title: 'Birthday Party',
                        description: 'Celebrate another year of life with cake, balloons, and unforgettable memories',
                        icon: 'cake',
                        features: [
                                'Birthday cake & candles',
                                'Age-appropriate decorations',
                                'Party games & activities',
                                'Photo opportunities',
                        ],
                        status: 'active',
                        badge: {
                                text: 'Most Popular',
                                variant: 'popular',
                        },
                },
                {
                        id: 'baby-shower',
                        title: 'Baby Shower',
                        description: 'Welcome the new arrival with sweet celebrations and precious moments',
                        icon: 'baby',
                        features: [
                                'Gender reveal options',
                                'Baby-themed decorations',
                                'Gift opening setup',
                                'Keepsake activities',
                        ],
                        status: 'inactive',
                        badge: {
                                text: 'Coming Soon',
                                variant: 'coming-soon',
                        },
                },
                {
                        id: 'dinner-party',
                        title: 'Dinner Party',
                        description: 'Host an elegant evening with fine dining and sophisticated ambiance',
                        icon: 'dinner',
                        features: [
                                'Elegant table settings',
                                'Menu planning assistance',
                                'Ambient lighting',
                                'Wine pairing suggestions',
                        ],
                        status: 'inactive',
                        badge: {
                                text: 'Coming Soon',
                                variant: 'coming-soon',
                        },
                },
        ]

        // Simulate progress updates
        React.useEffect(() => {
                if (!showProgressTracker) return

                const interval = setInterval(() => {
                        setProgressCategories((prev) => {
                                const newCategories = [...prev]

                                // Find the first running or pending step
                                for (let catIndex = 0; catIndex < newCategories.length; catIndex++) {
                                        const category = newCategories[catIndex]
                                        for (let stepIndex = 0; stepIndex < category.steps.length; stepIndex++) {
                                                const step = category.steps[stepIndex]

                                                if (step.status === 'running') {
                                                        // Increment progress
                                                        if (step.progress < 100) {
                                                                step.progress = Math.min(100, step.progress + 8)
                                                        } else {
                                                                // Mark as completed and move to next
                                                                step.status = 'completed'
                                                                step.progress = 100

                                                                // Start next step
                                                                const nextStepIndex = stepIndex + 1
                                                                if (nextStepIndex < category.steps.length) {
                                                                        category.steps[nextStepIndex].status = 'running'
                                                                } else {
                                                                        // Mark category as completed and start next category
                                                                        category.status = 'completed'
                                                                        const nextCatIndex = catIndex + 1
                                                                        if (nextCatIndex < newCategories.length) {
                                                                                newCategories[nextCatIndex].status = 'running'
                                                                                newCategories[nextCatIndex].steps[0].status = 'running'
                                                                        }
                                                                }
                                                        }
                                                        return newCategories
                                                } else if (step.status === 'pending' && catIndex === 0 && stepIndex === 0) {
                                                        // Start the first step
                                                        step.status = 'running'
                                                        category.status = 'running'
                                                        return newCategories
                                                }
                                        }
                                }

                                return newCategories
                        })
                }, 600)

                return () => clearInterval(interval)
        }, [showProgressTracker])


        return (
                <div className="min-h-screen bg-background p-8">
                        <div className="max-w-6xl mx-auto space-y-12">
                                {/* Header */}
                                <div className="text-center space-y-4">
                                        <h1 className="text-4xl font-bold text-foreground">Confetti Design System</h1>
                                        <p className="text-xl text-muted-foreground">
                                                A comprehensive component library for the Confetti application
                                        </p>
                                </div>

                                {/* Progress Components Demo */}
                                <section className="space-y-8">
                                        <h2 className="text-3xl font-semibold text-foreground">Progress Components</h2>

                                        {/* Progress Bars */}
                                        <Card>
                                                <CardHeader>
                                                        <h3 className="text-xl font-semibold">Progress Bar Component</h3>
                                                        <p className="text-muted-foreground">Animated progress bars with multiple variants</p>
                                                </CardHeader>
                                                <CardContent className="space-y-6">
                                                        <div className="space-y-4">
                                                                <ProgressBar progress={75} variant="default" label="Party Setup" showPercentage />
                                                                <ProgressBar
                                                                        progress={100}
                                                                        variant="success"
                                                                        label="Theme Analysis"
                                                                        showPercentage
                                                                />
                                                                <ProgressBar progress={45} variant="warning" label="Vendor Search" showPercentage />
                                                                <ProgressBar
                                                                        progress={25}
                                                                        variant="error"
                                                                        label="Payment Processing"
                                                                        showPercentage
                                                                />
                                                        </div>
                                                </CardContent>
                                        </Card>

                                        {/* Progress Steps */}
                                        <Card>
                                                <CardHeader>
                                                        <h3 className="text-xl font-semibold">Progress Stepper Component</h3>
                                                        <p className="text-muted-foreground">Horizontal stepper for multi-step processes</p>
                                                </CardHeader>
                                                <CardContent>
                                                        <ProgressStepper steps={stepperSteps} />
                                                </CardContent>
                                        </Card>

                                        <Card>
                                                <CardHeader>
                                                        <h3 className="text-xl font-semibold">Progress Step Component</h3>
                                                        <p className="text-muted-foreground">
                                                                Individual progress steps with status indicators
                                                        </p>
                                                </CardHeader>
                                                <CardContent>
                                                        <div className="space-y-4">
                                                                <ProgressStep
                                                                        title="Theme Analysis"
                                                                        description="Analyzing your party preferences and style choices"
                                                                        status="completed"
                                                                />
                                                                <ProgressStep
                                                                        title="AI Image Generation"
                                                                        description="Creating personalized decorations and elements"
                                                                        status="running"
                                                                        progress={65}
                                                                        estimatedTime="2 min"
                                                                />
                                                                <ProgressStep
                                                                        title="Vendor Recommendations"
                                                                        description="Finding the best local suppliers"
                                                                        status="pending"
                                                                        estimatedTime="1 min"
                                                                        isLast
                                                                />
                                                        </div>
                                                </CardContent>
                                        </Card>

                                        {/* Progress Tracker Demo */}
                                        <Card>
                                                <CardHeader>
                                                        <h3 className="text-xl font-semibold">Progress Tracker Modal</h3>
                                                        <p className="text-muted-foreground">Complete progress tracking experience</p>
                                                </CardHeader>
                                                <CardContent>
                                                        <Button
                                                                onClick={() => {
                                                                        setShowProgressTracker(true)
                                                                        // Reset progress
                                                                        setProgressCategories((prev) =>
                                                                                prev.map((cat) => ({
                                                                                        ...cat,
                                                                                        status: 'pending',
                                                                                        steps: cat.steps.map((step) => ({
                                                                                                ...step,
                                                                                                status: 'pending',
                                                                                                progress: 0,
                                                                                        })),
                                                                                }))
                                                                        )
                                                                }}
                                                                className="w-full"
                                                        >
                                                                Start Party Creation Demo
                                                        </Button>
                                                </CardContent>
                                        </Card>
                                </section>


                                {/* Timeline Demo */}
                                <section className="space-y-8">
                                        <h2 className="text-3xl font-semibold text-foreground">Interactive Timeline</h2>
                                        <p className="text-muted-foreground">
                                                Integrated timeline components from the inspiration project, 
                                                now styled with your design system's colors and patterns.
                                        </p>
                                        <TimelineDemo />
                                </section>

                                {/* Theme Selection Header Demo */}
                                <section className="space-y-8">
                                        <h2 className="text-3xl font-semibold text-foreground">Theme Selection Header</h2>
                                        <div className="border border-border rounded-lg overflow-hidden bg-background p-8">
                                                <ThemeSelectionHeader
                                                        currentStep={2}
                                                        title="Choose Your Theme"
                                                        subtitle="Perfect themes for your birthday"
                                                />
                                        </div>
                                </section>

                                {/* Party Selector Demo */}
                                <section className="space-y-8">
                                        <h2 className="text-3xl font-semibold text-foreground">
                                                Party Selection Layout (Full Screen)
                                        </h2>
                                        <div className="border border-border rounded-lg overflow-hidden">
                                                <PartySelectionLayout
                                                        options={partyOptions}
                                                        onSelect={(id) => console.log('Selected:', id)}
                                                        onBack={() => console.log('Back clicked')}
                                                        onContinue={(id) => console.log('Continue with:', id)}
                                                        className="min-h-[600px]"
                                                />
                                        </div>
                                </section>

                                {/* Original Party Selector Demo */}
                                <section className="space-y-8">
                                        <h2 className="text-3xl font-semibold text-foreground">Party Selector Component</h2>
                                        <PartySelector
                                                title="Alternative Layout Version"
                                                subtitle="This is the original component version with different styling."
                                                options={partyOptions}
                                                onSelect={(id) => console.log('Selected:', id)}
                                                onBack={() => console.log('Back clicked')}
                                        />
                                </section>

                                {/* New Atoms Section */}
                                <section className="space-y-8">
                                        <h2 className="text-3xl font-semibold text-foreground">New Atoms</h2>

                                        {/* Icons */}
                                        <Card>
                                                <CardHeader>
                                                        <h3 className="text-xl font-semibold">Icon Component</h3>
                                                        <p className="text-muted-foreground">Scalable icons for various use cases</p>
                                                </CardHeader>
                                                <CardContent className="space-y-4">
                                                        <div className="space-y-3">
                                                                <h4 className="font-medium">Sizes</h4>
                                                                <div className="flex items-center gap-4">
                                                                        <Icon name="cake" size="sm" />
                                                                        <Icon name="cake" size="md" />
                                                                        <Icon name="cake" size="lg" />
                                                                        <Icon name="cake" size="xl" />
                                                                </div>
                                                        </div>
                                                        <div className="space-y-3">
                                                                <h4 className="font-medium">Different Icons</h4>
                                                                <div className="flex items-center gap-4">
                                                                        <Icon name="cake" size="lg" />
                                                                        <Icon name="baby" size="lg" />
                                                                        <Icon name="dinner" size="lg" />
                                                                </div>
                                                        </div>
                                                </CardContent>
                                        </Card>

                                        {/* Status Badges */}
                                        <Card>
                                                <CardHeader>
                                                        <h3 className="text-xl font-semibold">Status Badge Component</h3>
                                                        <p className="text-muted-foreground">Status indicators for different states</p>
                                                </CardHeader>
                                                <CardContent className="space-y-4">
                                                        <div className="space-y-3">
                                                                <h4 className="font-medium">Variants</h4>
                                                                <div className="flex flex-wrap gap-3">
                                                                        <StatusBadge variant="popular">Most Popular</StatusBadge>
                                                                        <StatusBadge variant="coming-soon">Coming Soon</StatusBadge>
                                                                        <StatusBadge variant="new">New</StatusBadge>
                                                                        <StatusBadge variant="featured">Featured</StatusBadge>
                                                                </div>
                                                        </div>
                                                </CardContent>
                                        </Card>

                                        {/* Feature Lists */}
                                        <Card>
                                                <CardHeader>
                                                        <h3 className="text-xl font-semibold">Feature List Component</h3>
                                                        <p className="text-muted-foreground">Lists with active and inactive states</p>
                                                </CardHeader>
                                                <CardContent className="space-y-6">
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                                <div>
                                                                        <h4 className="font-medium mb-3">Active State</h4>
                                                                        <FeatureList
                                                                                variant="active"
                                                                                items={[
                                                                                        'Birthday cake & candles',
                                                                                        'Age-appropriate decorations',
                                                                                        'Party games & activities',
                                                                                        'Photo opportunities',
                                                                                ]}
                                                                        />
                                                                </div>
                                                                <div>
                                                                        <h4 className="font-medium mb-3">Inactive State</h4>
                                                                        <FeatureList
                                                                                variant="inactive"
                                                                                items={[
                                                                                        'Gender reveal options',
                                                                                        'Baby-themed decorations',
                                                                                        'Gift opening setup',
                                                                                        'Keepsake activities',
                                                                                ]}
                                                                        />
                                                                </div>
                                                        </div>
                                                </CardContent>
                                        </Card>
                                </section>

                                {/* Individual Party Cards */}
                                <section className="space-y-8">
                                        <h2 className="text-3xl font-semibold text-foreground">Party Card States</h2>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                {partyOptions.map((option) => (
                                                        <PartyCard
                                                                key={option.id}
                                                                title={option.title}
                                                                description={option.description}
                                                                icon={option.icon}
                                                                features={option.features}
                                                                status={option.status}
                                                                badge={option.badge}
                                                                onClick={() => console.log('Clicked:', option.id)}
                                                        />
                                                ))}
                                        </div>
                                </section>

                                {/* Atoms Section */}
                                <section className="space-y-8">
                                        <h2 className="text-3xl font-semibold text-foreground">Atoms</h2>

                                        {/* Buttons */}
                                        <Card>
                                                <CardHeader>
                                                        <h3 className="text-xl font-semibold">Button Component</h3>
                                                        <p className="text-muted-foreground">Multiple variants, sizes, and states</p>
                                                </CardHeader>
                                                <CardContent className="space-y-4">
                                                        <div className="space-y-3">
                                                                <h4 className="font-medium">Variants</h4>
                                                                <div className="flex flex-wrap gap-3">
                                                                        <Button variant="default">Default</Button>
                                                                        <Button variant="secondary">Secondary</Button>
                                                                        <Button variant="outline">Outline</Button>
                                                                        <Button variant="ghost">Ghost</Button>
                                                                        <Button variant="destructive">Destructive</Button>
                                                                </div>
                                                        </div>

                                                        <div className="space-y-3">
                                                                <h4 className="font-medium">Sizes</h4>
                                                                <div className="flex items-center gap-3">
                                                                        <Button size="sm">Small</Button>
                                                                        <Button size="md">Medium</Button>
                                                                        <Button size="lg">Large</Button>
                                                                </div>
                                                        </div>

                                                        <div className="space-y-3">
                                                                <h4 className="font-medium">States</h4>
                                                                <div className="flex items-center gap-3">
                                                                        <Button loading>Loading</Button>
                                                                        <Button disabled>Disabled</Button>
                                                                </div>
                                                        </div>
                                                </CardContent>
                                        </Card>

                                        {/* Inputs */}
                                        <Card>
                                                <CardHeader>
                                                        <h3 className="text-xl font-semibold">Original Input Component</h3>
                                                        <p className="text-muted-foreground">
                                                                Form inputs with labels, validation, and icons
                                                        </p>
                                                </CardHeader>
                                                <CardContent className="space-y-4">
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                <Input label="Default Input" placeholder="Enter text..." />
                                                                <Input
                                                                        label="With Helper Text"
                                                                        placeholder="Enter email"
                                                                        helperText="We'll never share your email"
                                                                />
                                                                <Input
                                                                        label="With Error"
                                                                        placeholder="Enter password"
                                                                        error="Password is required"
                                                                />
                                                                <Input label="Disabled" placeholder="This is disabled" disabled />
                                                        </div>
                                                </CardContent>
                                        </Card>

                                        {/* New Input Components */}
                                        <Card>
                                                <CardHeader>
                                                        <h3 className="text-xl font-semibold">Specialized Input Components</h3>
                                                        <p className="text-muted-foreground">
                                                                Dedicated input components for specific use cases
                                                        </p>
                                                </CardHeader>
                                                <CardContent className="space-y-6">
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                <TextInput
                                                                        label="Text Input"
                                                                        placeholder="Enter text..."
                                                                        helperText="Basic text input"
                                                                />
                                                                <EmailInput
                                                                        label="Email Input"
                                                                        placeholder="Enter email..."
                                                                        helperText="Built-in email validation"
                                                                />
                                                                <PasswordInput
                                                                        label="Password Input"
                                                                        placeholder="Enter password..."
                                                                        helperText="Toggle visibility"
                                                                />
                                                                <NumberInput
                                                                        label="Number Input"
                                                                        placeholder="Enter number..."
                                                                        helperText="With stepper controls"
                                                                        defaultValue="10"
                                                                        min={0}
                                                                        max={100}
                                                                />
                                                                <SearchInput
                                                                        label="Search Input"
                                                                        placeholder="Search..."
                                                                        helperText="With clear button"
                                                                        defaultValue="search term"
                                                                />
                                                                <Select
                                                                        label="Select Input"
                                                                        placeholder="Choose option..."
                                                                        helperText="Dropdown selection"
                                                                        options={[
                                                                                { value: 'option1', label: 'Option 1' },
                                                                                { value: 'option2', label: 'Option 2' },
                                                                                { value: 'option3', label: 'Option 3' },
                                                                        ]}
                                                                />
                                                        </div>

                                                        <div className="space-y-4">
                                                                <TextArea
                                                                        label="Text Area"
                                                                        placeholder="Enter long text..."
                                                                        helperText="Multi-line text input"
                                                                        rows={3}
                                                                />

                                                                <Checkbox label="Checkbox Input" helperText="Single checkbox option" />

                                                                <RadioButton
                                                                        label="Radio Button Group"
                                                                        helperText="Choose one option"
                                                                        options={[
                                                                                { value: 'option1', label: 'Option 1', helperText: 'First choice' },
                                                                                { value: 'option2', label: 'Option 2', helperText: 'Second choice' },
                                                                                { value: 'option3', label: 'Option 3', helperText: 'Third choice' },
                                                                        ]}
                                                                        name="demo-radio"
                                                                />
                                                        </div>

                                                        <div className="space-y-4">
                                                                <DatePicker
                                                                        label="Date Picker"
                                                                        placeholder="Select date..."
                                                                        helperText="Modern date picker with calendar"
                                                                />
                                                        </div>
                                                </CardContent>
                                        </Card>

                                        {/* Badges */}
                                        <Card>
                                                <CardHeader>
                                                        <h3 className="text-xl font-semibold">Badge Component</h3>
                                                        <p className="text-muted-foreground">Status indicators and labels</p>
                                                </CardHeader>
                                                <CardContent className="space-y-4">
                                                        <div className="space-y-3">
                                                                <h4 className="font-medium">Variants</h4>
                                                                <div className="flex flex-wrap gap-3">
                                                                        <Badge variant="default">Default</Badge>
                                                                        <Badge variant="secondary">Secondary</Badge>
                                                                        <Badge variant="outline">Outline</Badge>
                                                                        <Badge variant="destructive">Destructive</Badge>
                                                                        <Badge variant="success">Success</Badge>
                                                                        <Badge variant="warning">Warning</Badge>
                                                                        <Badge variant="info">Info</Badge>
                                                                </div>
                                                        </div>

                                                        <div className="space-y-3">
                                                                <h4 className="font-medium">Sizes</h4>
                                                                <div className="flex items-center gap-3">
                                                                        <Badge size="sm">Small</Badge>
                                                                        <Badge size="md">Medium</Badge>
                                                                        <Badge size="lg">Large</Badge>
                                                                </div>
                                                        </div>
                                                </CardContent>
                                        </Card>
                                </section>

                                {/* Molecules Section */}
                                <section className="space-y-8">
                                        <h2 className="text-3xl font-semibold text-foreground">Molecules</h2>

                                        {/* Cards */}
                                        <Card>
                                                <CardHeader>
                                                        <h3 className="text-xl font-semibold">Card Component</h3>
                                                        <p className="text-muted-foreground">
                                                                Content containers with header, content, and footer
                                                        </p>
                                                </CardHeader>
                                                <CardContent className="space-y-6">
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                                <Card>
                                                                        <CardHeader>
                                                                                <h4 className="font-semibold">Simple Card</h4>
                                                                        </CardHeader>
                                                                        <CardContent>
                                                                                <p>This is a simple card with just header and content.</p>
                                                                        </CardContent>
                                                                </Card>

                                                                <Card>
                                                                        <CardHeader>
                                                                                <h4 className="font-semibold">Card with Footer</h4>
                                                                        </CardHeader>
                                                                        <CardContent>
                                                                                <p>This card has a footer with action buttons.</p>
                                                                        </CardContent>
                                                                        <CardFooter>
                                                                                <Button variant="outline" size="sm">
                                                                                        Cancel
                                                                                </Button>
                                                                                <Button size="sm">Save</Button>
                                                                        </CardFooter>
                                                                </Card>
                                                        </div>
                                                </CardContent>
                                        </Card>
                                </section>

                                {/* Footer */}
                                <footer className="text-center text-muted-foreground py-8">
                                        <p>Confetti Design System v0.1.0</p>
                                        <p className="text-sm mt-2">Built with React, TypeScript, and Tailwind CSS</p>
                                </footer>

                                {/* Progress Tracker Modal */}
                                <ProgressTracker
                                        isOpen={showProgressTracker}
                                        categories={progressCategories}
                                        onClose={() => setShowProgressTracker(false)}
                                        onComplete={() => {
                                                console.log('Party creation completed!')
                                                setTimeout(() => setShowProgressTracker(false), 3000)
                                        }}
                                        title="Creating Your Dream Party"
                                        subtitle="Our AI is working behind the scenes to make your party perfect"
                                        allowClose={true}
                                />
                        </div>
                </div>
        )
}
