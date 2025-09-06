import { Button } from 'primereact/button';
import { Component, ErrorInfo, ReactNode } from 'react';

type Props = { children: ReactNode };
type State = { hasError: boolean };

/**
 * ErrorBoundaryApp is a React component that acts as an error boundary.
 * It catches JavaScript errors in its child components and displays a fallback UI.
 * This is useful for preventing the entire application from crashing due to an error in a single component.
 */
export default class ErrorBoundaryApp extends Component<Props, State> {
    /**
     * Constructor for ErrorBoundaryApp.
     *
     * @param props - The props passed to the component.
     */
    constructor(props: Props) {
        super(props);

        this.state = { hasError: false };
    }

    /**
     * Updates state so the next render will show the fallback UI.
     * @returns Updated state with `hasError` set to true.
     */
    static getDerivedStateFromError(): State {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    /**
     * Renders the component UI.
     * If an error has been caught, it renders a fallback UI.
     * Otherwise, it renders the child components.
     * @returns The component UI.
     */
    render(): ReactNode {
        const { children } = this.props;
        const { hasError } = this.state;

        if (hasError) {
            // Fallback UI
            return (
                <div>
                    <h1>Something went wrong.</h1>
                    <Button
                        type="button"
                        onClick={() => window.location.reload()}
                    >
                        Try again
                    </Button>
                </div>
            );
        }

        // Normally, just render children
        return children;
    }
}
