import { createContext, useCallback, useEffect, useMemo, useRef, useState } from "react";

export const ResumeInfoContext = createContext({
  resumeInfo: null,
  setResumeInfo: () => {},
  getResumeInfo: () => null,
});

export function ResumeInfoProvider({ children, initialValue = null }) {
  const [resumeInfo, setResumeInfoState] = useState(initialValue);
  const resumeInfoRef = useRef(resumeInfo);

  const setResumeInfo = useCallback((nextValue) => {
    resumeInfoRef.current = typeof nextValue === 'function'
      ? nextValue(resumeInfoRef.current)
      : nextValue;
    setResumeInfoState(resumeInfoRef.current);
  }, []);

  const contextValue = useMemo(() => ({
    resumeInfo,
    setResumeInfo,
    getResumeInfo: () => resumeInfoRef.current,
  }), [resumeInfo, setResumeInfo]);

  useEffect(() => {
    if (initialValue !== null && initialValue !== undefined) {
      setResumeInfo(initialValue);
    }
  }, [initialValue, setResumeInfo]);

  return (
    <ResumeInfoContext.Provider value={contextValue}>
      {children}
    </ResumeInfoContext.Provider>
  );
}