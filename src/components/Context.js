import React, { useState } from 'react';

export const newContext = (value) => {
  const context = {};
  context.context = React.createContext(value);
  const MyContext = context.context;
  context.provider = ({ children }) => {
    const [state, setState] = useState({
      value: value,
      setValue: newVal => setState({ ...state, value: newVal })
    });
    return <MyContext.Provider value={state}>{children}</MyContext.Provider>;
  };
  return context;
};

export const provideContext = (context, component) => {
  const MyContext = context.provider;
  return <MyContext>{component}</MyContext>;
};

export const provideContexts = (contextArray, component) => {
  if (contextArray < 1) return component;
  let result = provideContext(contextArray[0], component);
  for (let i = 1; i < contextArray.length; i++) {
    result = provideContext(contextArray[i], result);
  }
  return result;
};
