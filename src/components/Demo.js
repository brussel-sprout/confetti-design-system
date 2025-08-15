import React from 'react';
import { Badge } from './atoms/Badge';
import { Button } from './atoms/Button';
import { Input } from './atoms/Input';
import { Card, CardContent, CardFooter, CardHeader } from './molecules/Card';
export const Demo = () => {
    return (<div className="min-h-screen bg-background p-8">
			<div className="max-w-6xl mx-auto space-y-12">
				{/* Header */}
				<div className="text-center space-y-4">
					<h1 className="text-4xl font-bold text-foreground">Confetti Design System</h1>
					<p className="text-xl text-muted-foreground">
						A comprehensive component library for the Confetti application
					</p>
				</div>

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
							<h3 className="text-xl font-semibold">Input Component</h3>
							<p className="text-muted-foreground">
								Form inputs with labels, validation, and icons
							</p>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<Input label="Default Input" placeholder="Enter text..."/>
								<Input label="With Helper Text" placeholder="Enter email" helperText="We'll never share your email"/>
								<Input label="With Error" placeholder="Enter password" error="Password is required"/>
								<Input label="Disabled" placeholder="This is disabled" disabled/>
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
			</div>
		</div>);
};
