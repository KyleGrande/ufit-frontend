import React, { createContext, useState, useEffect, useContext } from 'react';
import API, { Program,api } from '../api';
import useAuth from '../hook/useAuth';

type UserProgramsContextProps = {
  programs: Program[] | null;
  error: string | null;
  addProgram: (program: Program) => void; 
  deleteProgram: (programId: { $oid: string; }) => void;
  handlePrograms: (userId:any)=>void;
  updateProgram: (data:any) => void;
};

export const UserProgramsContext = createContext<UserProgramsContextProps>({
  programs: null,
  error: null,
  addProgram: () => {},
  deleteProgram: () => {},
  handlePrograms: () =>{},
  updateProgram: ()=>{},
});

export function UserProgramsProvider({ children }: { children: React.ReactNode }) {
  const [programs, setPrograms] = useState<Program[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const userId = useAuth()._id as string;

  const handlePrograms = async(userId:any) => {
    try{
      let res = await API.getProgramsByUserId(userId);
      setPrograms(res.data.data);
      setError(null);
    }catch(err){
      console.log(err);
      setError('Error Retrieving Data');
    }
  }

  useEffect(() => {
    handlePrograms(userId);
  }, [userId]);

  const addProgram = (program: Program) => {
    console.log ('addProgram', program);
    setPrograms((prevPrograms) => (prevPrograms ? [...prevPrograms, program] : [program]));
  };

  const deleteProgram = (programId: { $oid: string; }) => {
    console.log ('deleteProgram', programId);
    setPrograms((prevPrograms) => (prevPrograms ? prevPrograms.filter((program) => program._id !== programId) : []));
  };
  
  // delete and add sessions uses this function
  const updateProgram = async (data: any) => {
    // api call to update the specific program
    try {
      let response = await api.put('/program/by-id', data);
      if(response.data.success){
        console.log(response.data);
        return true;
      }
      else{
        console.log(response.data);
        return false;
      }
    } catch(err){
      console.log(err);
      return false;
    }
  
  }

  return (
    <UserProgramsContext.Provider value={{ programs, error, addProgram, deleteProgram, handlePrograms, updateProgram }}>
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
