import React, { createContext, useContext, useState, ReactNode } from "react";

// Define a type for your context
interface UserContextType {
    accessToken: string;
    setAccessToken: React.Dispatch<React.SetStateAction<string>>;
    role: string;
    setRole: React.Dispatch<React.SetStateAction<string>>;
    loggedInId: string;
    setLoggedInId: React.Dispatch<React.SetStateAction<string>>;
}

// Create a context with a default value od undefined
//                           type can either be UserContextType or undefined        
const UserContext = createContext<UserContextType | undefined>(undefined);

// Define a type for the provider props
interface UserProviderProps {
  children: ReactNode;
  value: UserContextType;
}

// Create a provider component

//define UserProvider as a react functional component with props type UserProvider and destructures children from props
export const UserProvider: React.FC<UserProviderProps> = ({ children , value}) => {
 
  return (
    // Wraps children with the context provider, passing the user state and setUser function as the context value.
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => {
    //retrieving the context value
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  //returns the context value if is defined
  return context;
};

export default UserContext;
