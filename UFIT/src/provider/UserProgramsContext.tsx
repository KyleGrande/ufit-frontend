import React, { createContext, useState, useEffect, useContext } from 'react';
import API, { Program } from '../api';
import useAuth from '../hook/useAuth';

type UserProgramsContextProps = {
  programs: Program[] | null;
  error: string | null;
  loading: boolean;
};

export const UserProgramsContext = createContext<UserProgramsContextProps>({
  programs: null,
  error: null,
  loading: false,
});

export function UserProgramsProvider({ children }: { children: React.ReactNode }) {
  const [programs, setPrograms] = useState<Program[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const userId = useAuth()._id as string;

  useEffect(() => {
    setLoading(true);
    API.getProgramsByUserId(userId)
      .then((response) => {
        setPrograms(response.data.data);
        setError(null);
      })
      .catch((err) => {
        console.log(err);
        setError('Error retrieving data');
      })
      .finally(() => setLoading(false));
  }, [userId]);

  return (
    <UserProgramsContext.Provider value={{ programs, error, loading }}>
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
