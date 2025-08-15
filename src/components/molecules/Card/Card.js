import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { cn } from '../../../utils/cn';
const Card = React.forwardRef(({ children, className = '', ...props }, ref) => {
    return (_jsx("div", { ref: ref, className: cn('bg-background border border-border rounded-xl shadow-sm', 'transition-all duration-300 hover:shadow-lg', className), ...props, children: children }));
});
const CardHeader = React.forwardRef(({ children, className = '', ...props }, ref) => {
    return (_jsx("div", { ref: ref, className: cn('flex flex-col space-y-1.5 p-6 pb-0', className), ...props, children: children }));
});
const CardContent = React.forwardRef(({ children, className = '', ...props }, ref) => {
    return (_jsx("div", { ref: ref, className: cn('p-6 pt-0', className), ...props, children: children }));
});
const CardFooter = React.forwardRef(({ children, className = '', ...props }, ref) => {
    return (_jsx("div", { ref: ref, className: cn('flex items-center p-6 pt-0', className), ...props, children: children }));
});
Card.displayName = 'Card';
CardHeader.displayName = 'CardHeader';
CardContent.displayName = 'CardContent';
CardFooter.displayName = 'CardFooter';
export { Card, CardHeader, CardContent, CardFooter };
