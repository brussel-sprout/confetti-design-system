import React from 'react'
import { ChevronDown, User, Settings, LogOut } from 'lucide-react'

import { Logo } from '../../atoms/Logo'
import { cn } from '../../../utils/cn'

export interface NavbarProps {
	isLoggedIn?: boolean
	username?: string
	onProfileClick?: () => void
	onSettingsClick?: () => void
	onLogoutClick?: () => void
	className?: string
}

const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
	({ 
		isLoggedIn = false,
		username = 'User',
		onProfileClick,
		onSettingsClick,
		onLogoutClick,
		className = '', 
		...props 
	}, ref) => {
		const [isDropdownOpen, setIsDropdownOpen] = React.useState(false)

		return (
			<nav
				ref={ref}
				className={cn(
					'w-full bg-background/95 backdrop-blur-sm border-b border-border',
					'sticky top-0 z-50',
					'transition-all duration-200',
					className
				)}
				{...props}
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between h-16">
						{/* Logo */}
						<div className="flex-shrink-0">
							<Logo size="sm" />
						</div>

						{/* Right Side Content */}
						{isLoggedIn ? (
							/* Account Dropdown */
							<div className="relative">
								<button
									onClick={() => setIsDropdownOpen(!isDropdownOpen)}
									className={cn(
										'flex items-center gap-2 px-3 py-2 rounded-lg',
										'text-sm font-medium text-foreground',
										'hover:bg-muted/50 transition-colors duration-200',
										'focus:outline-none focus:ring-2 focus:ring-primary/20'
									)}
								>
									<div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
										<User className="w-4 h-4" />
									</div>
									<span>{username}</span>
									<ChevronDown className={cn(
										'w-4 h-4 transition-transform duration-200',
										isDropdownOpen ? 'rotate-180' : ''
									)} />
								</button>

								{/* Dropdown Menu */}
								{isDropdownOpen && (
									<div className={cn(
										'absolute right-0 mt-2 w-48 py-2',
										'bg-background border border-border rounded-lg shadow-lg',
										'animate-fade-in z-50'
									)}>
										<button
											onClick={() => {
												onProfileClick?.()
												setIsDropdownOpen(false)
											}}
											className={cn(
												'w-full flex items-center gap-3 px-4 py-2 text-left',
												'text-sm text-foreground hover:bg-muted/50',
												'transition-colors duration-200'
											)}
										>
											<User className="w-4 h-4" />
											Profile
										</button>
										<button
											onClick={() => {
												onSettingsClick?.()
												setIsDropdownOpen(false)
											}}
											className={cn(
												'w-full flex items-center gap-3 px-4 py-2 text-left',
												'text-sm text-foreground hover:bg-muted/50',
												'transition-colors duration-200'
											)}
										>
											<Settings className="w-4 h-4" />
											Settings
										</button>
										<hr className="my-1 border-border" />
										<button
											onClick={() => {
												onLogoutClick?.()
												setIsDropdownOpen(false)
											}}
											className={cn(
												'w-full flex items-center gap-3 px-4 py-2 text-left',
												'text-sm text-destructive hover:bg-destructive/10',
												'transition-colors duration-200'
											)}
										>
											<LogOut className="w-4 h-4" />
											Logout
										</button>
									</div>
								)}
							</div>
						) : (
							/* Auth Links */
							<div className="flex items-center gap-4">
								<a
									href="/login"
									className={cn(
										'text-sm font-medium text-muted-foreground',
										'hover:text-foreground transition-colors duration-200',
										'px-3 py-2 rounded-md',
										'focus:outline-none focus:ring-2 focus:ring-primary/20'
									)}
								>
									Login
								</a>
								<a
									href="/sign-up"
									className={cn(
										'text-sm font-medium',
										'bg-primary text-primary-foreground',
										'hover:bg-primary/90 transition-colors duration-200',
										'px-4 py-2 rounded-lg',
										'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2'
									)}
								>
									Sign Up
								</a>
							</div>
						)}
					</div>
				</div>
			</nav>
		)
	}
)

Navbar.displayName = 'Navbar'

export { Navbar }