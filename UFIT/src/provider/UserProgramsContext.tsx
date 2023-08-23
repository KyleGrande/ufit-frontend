import React, { createContext, useState, useEffect, useContext } from 'react';
import API, { Program,api } from '../api';
import useAuth from '../hook/useAuth';

type UserProgramsContextProps = {
  discoverData: Program[] | null;
  programs: Program[] | null;
  error: string | null;
  discoverError: string | null;
  addProgram: (program: Program) => void; 
  deleteProgram: (programId: { $oid: string; }) => void;
  handlePrograms: (userId:any)=>void;
  updateProgram: (data:any) => void;
  handleDiscoverPrograms: () => void;
};

export const UserProgramsContext = createContext<UserProgramsContextProps>({
  discoverData: null,
  programs: null,
  error: null,
  discoverError: null,
  addProgram: () => {},
  deleteProgram: () => {},
  handlePrograms: () =>{},
  updateProgram: ()=>{},
  handleDiscoverPrograms: ()=>{},
});

export function UserProgramsProvider({ children }: { children: React.ReactNode }) {
  const [discoverData, setDiscoverData] = useState<Program[] | null>(null);
  const [discoverError, setDiscoverError] = useState<null | string>(null);
  const [programs, setPrograms] = useState<Program[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const userId = useAuth()._id as string;

  const handleDiscoverPrograms = async() => {
    try {
      let response = await API.getPrograms()
      let noOriginalPrograms = response.data.data.filter((program: Program) => !program.originalProgramId);
      setDiscoverData(noOriginalPrograms);
      setDiscoverError(null);
    }catch(err){
      console.log(err);
      setDiscoverError('Error retrieving data');
    }
  }

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
  
  useEffect(()=> {
    handleDiscoverPrograms();
  }, [])

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
    <UserProgramsContext.Provider value={{ discoverData, programs, error, discoverError, addProgram, deleteProgram, handlePrograms, updateProgram, handleDiscoverPrograms }}>
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
