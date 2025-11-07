import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught an error', error, info);
  }

  resetErrorBoundary = () => {
    this.setState({ hasError: false, error: null });
    if (typeof this.props.onReset === 'function') {
      this.props.onReset();
    }
  };

  render() {
    const { hasError, error } = this.state;
    const { FallbackComponent, fallback } = this.props;

    if (hasError) {
      if (FallbackComponent) {
        return (
          <FallbackComponent
            error={error}
            resetErrorBoundary={this.resetErrorBoundary}
          />
        );
      }

      if (fallback) {
        return fallback;
      }

      return (
        <div className='p-6 text-center'>
          <h2 className='mb-2 text-xl font-semibold'>Something went wrong.</h2>
          <p className='text-muted-foreground'>Please refresh the page or try again later.</p>
          <button
            type='button'
            onClick={this.resetErrorBoundary}
            className='mt-4 rounded-md border px-4 py-2 text-sm'
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
