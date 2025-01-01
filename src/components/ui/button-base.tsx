import React, { useState, useEffect } from "react";

type ButtonBaseProps = {
    children: React.ReactNode;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    className?: string;
    disableRipple?: boolean;
    [key: string]: unknown;
};

const ButtonBase: React.FC<ButtonBaseProps> = ({
    children,
    onClick,
    className,
    disableRipple,
    ...rest
}) => {
    const [ripples, setRipples] = useState<React.ReactNode[]>([]);
    const [shouldRemoveRipple, setShouldRemoveRipple] = useState(false); // Flag to remove ripple after animation

    // Use useEffect to remove ripple after animation
    useEffect(() => {
        if (shouldRemoveRipple) {
            const timeout = setTimeout(() => {
                setRipples((prev) => prev.slice(1)); // Remove the first ripple (the one that finished animating)
                setShouldRemoveRipple(false); // Reset flag
            }, 500); // Duration of the ripple animation
            return () => clearTimeout(timeout); // Clean up timeout on component unmount
        }
    }, [shouldRemoveRipple]);

    const createRipple = (e: React.MouseEvent<HTMLElement>) => {
        if (disableRipple) return;
        const button = e.currentTarget;
        if (!button) return; // Ensure button is defined
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        const rippleKey = Date.now(); // Create a unique key for each ripple

        const ripple = (
            <span
                key={rippleKey} // Use the unique key for the ripple
                className="absolute bg-white opacity-50 rounded-full pointer-events-none animate-ripple"
                style={{
                    width: size,
                    height: size,
                    left: x,
                    top: y
                }}
            />
        );

        setRipples((prev) => [...prev, ripple]); // Add new ripple
        setShouldRemoveRipple(true); // Trigger ripple removal after animation
    };

    // Ensure we call createRipple and the provided onClick function correctly
    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        createRipple(e); // Call ripple effect
        if (onClick) onClick(e); // Call the onClick if it exists
    };

    return (
        <button
            {...rest} // Spread any props from getRootProps here (important for dropzone)
            className={`relative inline-flex items-center justify-center overflow-hidden p-4 bg-blue-500 text-white rounded-lg ${className}`}
            onClick={handleClick} // Use handleClick to ensure correct event passing
        >
            {children}
            {ripples}
        </button>
    );
};

export default ButtonBase;
