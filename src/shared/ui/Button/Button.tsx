import './Button.scss';

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps 
    extends React.ButtonHTMLAttributes<HTMLButtonElement>    {
    variant?: ButtonVariant;
    size?: ButtonSize;
    fullWidth?: boolean;
    loading?: boolean;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    style?: React.CSSProperties;
    onClick?: () => void
}

/**
 * Common Button component with support for different variants, sizes, loading state, and icons.
 */
const Button = (
    (
        {
            children,
            loading = false,
            startIcon,
            endIcon,
            disabled,
            className,
            type,
            onClick
        }: ButtonProps
    ) => {
        const isDisabled = disabled;

        return (
            <button
                type={type || "button"}
                aria-busy={loading || undefined}
                disabled={isDisabled}
                className={'base-button' + (className ? ` ${className}` : '')}
                onClick={onClick}
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

export default Button;