/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useState, createContext, useContext } from "react";

export const UserContext = createContext(false);
export const UserUpdateContext = createContext((value: boolean) => {});

export const useLoggedIn = () => useContext(UserContext);
export const useLoggedInUpdate = () => useContext(UserUpdateContext);

const UserProvider = ({ children }: any) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLoggedInUpdate = (value: boolean) => setLoggedIn(value);

  return (
    <UserContext.Provider value={loggedIn}>
      <UserUpdateContext.Provider value={handleLoggedInUpdate}>
        {children}
      </UserUpdateContext.Provider>
    </UserContext.Provider>
  );
};

export default UserProvider;
