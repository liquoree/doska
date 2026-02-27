import { forwardRef } from "react";
import './Button.scss';

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    fullWidth?: boolean;
    loading?: boolean;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    style?: React.CSSProperties;
}

/**
 * Common Button component with support for different variants, sizes, loading state, and icons.
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            children,
            variant = "primary",
            size = "md",
            fullWidth = false,
            loading = false,
            startIcon,
            endIcon,
            disabled,
            className,
            ...rest
        },
        ref
    ) => {
        const isDisabled = disabled || loading;

        return (
            <button
                ref={ref}
                type={(rest.type as any) ?? "button"}
                aria-busy={loading || undefined}
                disabled={isDisabled}
                className={'base-button' + (className ? ` ${className}` : '')}
                {...rest}
            >
                {loading ? (
                    <svg
                        role="img"
                        width={'10px'}
                        height={'10px'}
                        viewBox="0 0 50 50"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                    >
                        <circle
                            cx="25"
                            cy="25"
                            r="20"
                            fill="none"
                            stroke={'#ccc'}
                            strokeWidth="5"
                            strokeOpacity="0.25"
                        />
                        <path
                            d="M45 25a20 20 0 0 1-20 20"
                            fill="none"
                            stroke={'#ccc'}
                            strokeWidth="5"
                            strokeLinecap="round"
                        >
                            <animateTransform
                                attributeName="transform"
                                type="rotate"
                                from="0 25 25"
                                to="360 25 25"
                                dur="0.9s"
                                repeatCount="indefinite"
                            />
                        </path>
                    </svg>
                ) : (
                    startIcon
                )}

                <span style={{ display: "inline-flex", alignItems: "center", gap: '6px' }}>
                    {children}
                </span>

                {!loading && endIcon}
            </button>
        );
    }
);

Button.displayName = "Button";

export default Button;