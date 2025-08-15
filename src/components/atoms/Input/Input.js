import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { cn } from '../../../utils/cn';
const Input = React.forwardRef(({ label, error, helperText, leftIcon, rightIcon, size = 'md', variant = 'default', className = '', id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const baseClasses = cn('w-full transition-all duration-200 ease-in-out', 'focus:outline-none focus:ring-2 focus:ring-offset-2', 'disabled:opacity-50 disabled:cursor-not-allowed', 'placeholder:text-muted-foreground');
    const sizeClasses = {
        sm: 'px-3 py-2 text-sm',
        md: 'px-4 py-3 text-base',
        lg: 'px-4 py-4 text-lg',
    };
    const variantClasses = {
        default: cn('bg-background border border-border', 'focus:border-primary focus:ring-primary/20', 'hover:border-primary/60'),
        outline: cn('bg-transparent border-2 border-border', 'focus:border-primary focus:ring-primary/20', 'hover:border-primary/40'),
        filled: cn('bg-muted/50 border border-transparent', 'focus:bg-background focus:border-primary focus:ring-primary/20', 'hover:bg-muted/70'),
    };
    const inputClasses = cn(baseClasses, sizeClasses[size], variantClasses[variant], 'rounded-xl', leftIcon ? 'pl-10' : '', rightIcon ? 'pr-10' : '', error ? 'border-destructive focus:border-destructive focus:ring-destructive/20' : '', className);
    return (_jsxs("div", { className: "w-full", children: [label && (_jsx("label", { htmlFor: inputId, className: "block text-sm font-medium text-foreground mb-2", children: label })), _jsxs("div", { className: "relative", children: [leftIcon && (_jsx("div", { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground", children: leftIcon })), _jsx("input", { ref: ref, id: inputId, className: inputClasses, ...props }), rightIcon && (_jsx("div", { className: "absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground", children: rightIcon }))] }), error && _jsx("p", { className: "mt-1 text-sm text-destructive", children: error }), helperText && !error && _jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: helperText })] }));
});
Input.displayName = 'Input';
export { Input };
