import React from 'react'

const ErrorBoundaryComponent = ({error, resetErrorBoundary}) => {
  // console.log(error);
    return (
        <div role="alert">
          <p>Something went wrong:</p>
          <pre>{error.message}</pre>
        </div>
      )
}

export default ErrorBoundaryComponent

