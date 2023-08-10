import React, { createContext, useState, useEffect, useContext } from 'react';
import API, { Program } from '../api';
import useAuth from '../hook/useAuth';

type UserProgramsContextProps = {
  programs: Program[] | null;
  error: string | null;
  addProgram: (program: Program) => void; 
};

export const UserProgramsContext = createContext<UserProgramsContextProps>({
  programs: null,
  error: null,
  addProgram: () => {},
});

export function UserProgramsProvider({ children }: { children: React.ReactNode }) {
  const [programs, setPrograms] = useState<Program[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const userId = useAuth()._id as string;

  useEffect(() => {
    API.getProgramsByUserId(userId)
      .then((response) => {
        setPrograms(response.data.data);
        setError(null);
      })
      .catch((err) => {
        console.log(err);
        setError('Error retrieving data');
      })
  }, [userId]);

  const addProgram = (program: Program) => {
    console.log ('addProgram', program);
    setPrograms((prevPrograms) => (prevPrograms ? [...prevPrograms, program] : [program]));
  };

  return (
    <UserProgramsContext.Provider value={{ programs, error, addProgram }}>
      {children}
    </UserProgramsContext.Provider>
  );
}

export function useUserPrograms() {
  const context = useContext(UserProgramsContext);
  if (!context) {
    throw new Error('useUserPrograms must be used within a UserProgramsProvider');
  }
  return context;
}
