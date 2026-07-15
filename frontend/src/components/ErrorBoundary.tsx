import React from 'react';

type State = { hasError: boolean; error?: Error };

class ErrorBoundary extends React.Component<React.PropsWithChildren<{}>, State> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: false, error };
  }

  componentDidCatch(_error: Error, _info: any) {
    // optional: send to remote logging
    // console.error('Uncaught error in component tree', _error, _info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="bg-white rounded-lg shadow p-6 max-w-2xl">
            <h2 className="text-lg font-semibold mb-2">Something went wrong</h2>
            <p className="text-sm text-gray-600 mb-4">An unexpected error occurred. Please try again or contact support.</p>
            <details className="whitespace-pre-wrap text-xs text-gray-500">
              {this.state.error?.stack}
            </details>
          </div>
        </div>
      );
    }

    return this.props.children as React.ReactElement;
  }
}

export default ErrorBoundary;
