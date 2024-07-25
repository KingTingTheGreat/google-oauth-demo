import { createContext, useContext, useState } from "react";

const STORAGE_KEY = "my-test";

const getCurrentState = (): UserContextState | null => {
  try {
    const stringData = localStorage.getItem(STORAGE_KEY);
    const parsedData = JSON.parse(stringData as string) as UserContextState;
    return parsedData;
  } catch {
    return null;
  }
};

const defaultState: UserContextState = {
  sessionId: "",
  state: "",
};

const UserContext = createContext<UserContextType | null>(null);

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, setState] = useState(getCurrentState() || defaultState);

  const set = (newChanges: Partial<UserContextState>) => {
    const newState = {
      ...state,
      ...newChanges,
    };
    setState(newState);
  };

  const save = (newChanges: Partial<UserContextState>) => {
    // could also use cookies
    try {
      console.log("saving");
      const newState = {
        ...state,
        ...newChanges,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
      setState(newState);
    } catch {
      return;
    }
  };

  return (
    <UserContext.Provider value={{ state, set, save }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used with a UserContextProvider");
  }
  return context;
};

export type UserContextType = {
  state: UserContextState;
  set: (newChanges: Partial<UserContextState>) => void;
  save: (state: Partial<UserContextState>) => void;
};

export type UserContextState = {
  sessionId: string;
  state: string;
};
