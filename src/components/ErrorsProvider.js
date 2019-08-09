import React, { useState } from 'react';

export const ErrorContext = React.createContext({
  errors: { hasErrors: false, message: '' },
  setErrors: function(oldErrors, errors) {
    oldErrors = errors;
  }
});

export const ErrorsProvider = ({ children }) => {
  const [errorState, setErrorState] = useState({
    errors: { hasErrors: false, message: '' },
    setErrors: newErrors => {
      setErrorState({ ...errorState, errors: { ...newErrors } });
    }
  });

  return (
    <ErrorContext.Provider value={errorState}>{children}</ErrorContext.Provider>
  );
};
