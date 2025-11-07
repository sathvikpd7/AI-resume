import { createContext, useCallback, useRef, useState } from "react";

export const ResumeInfoContext = createContext({
  state: null,
  setState: () => {}
});

export function ResumeInfoProvider({ children, initialValue = null }) {
  const [state, _setState] = useState(initialValue);
  const stateRef = useRef(state);

  // Update both state and ref
  const setState = useCallback((newState) => {
    stateRef.current = typeof newState === 'function' 
      ? newState(stateRef.current) 
      : newState;
    _setState(stateRef.current);
  }, []);

  // Create a stable context value
  const contextValue = useRef({
    state,
    setState,
    // Add a way to get the current state without causing re-renders
    getState: () => stateRef.current
  });

  // Update the context value when state changes
  contextValue.current.state = state;

  return (
    <ResumeInfoContext.Provider value={contextValue.current}>
      {children}
    </ResumeInfoContext.Provider>
  );
}