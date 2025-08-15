import React from 'react';
import { cn } from '../../../utils/cn';
const Badge = React.forwardRef(({ children, variant = 'default', size = 'md', className = '', ...props }, ref) => {
    const baseClasses = cn('inline-flex items-center justify-center font-medium', 'transition-colors duration-200', 'rounded-full');
    const sizeClasses = {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-1 text-sm',
        lg: 'px-3 py-1.5 text-base',
    };
    const variantClasses = {
        default: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        outline: 'bg-transparent text-foreground border border-border',
        destructive: 'bg-destructive text-destructive-foreground',
        success: 'bg-success text-success-foreground',
        warning: 'bg-warning text-warning-foreground',
        info: 'bg-info text-info-foreground',
    };
    const classes = cn(baseClasses, sizeClasses[size], variantClasses[variant], className);
    return (<div ref={ref} className={classes} {...props}>
				{children}
			</div>);
});
Badge.displayName = 'Badge';
export { Badge };
