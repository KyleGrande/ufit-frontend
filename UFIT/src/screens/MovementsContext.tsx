import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import API, {Movement} from '../api';

interface MovementsContextValue {
  movements: Movement[];
  handleMovements: (program: any) => void;
}

const MovementsContext = createContext<MovementsContextValue | undefined>(undefined);

export const useMovementsContext = () => {
  const context = useContext(MovementsContext);
  if (!context) {
    throw new Error('useMovementsContext must be used within a MovementsProvider');
  }
  return context;
};

interface MovementsProviderProps {
  children: ReactNode;
}

export const MovementsProvider: React.FC<MovementsProviderProps> = ({ children }) => {
  const [movements, setMovements] = useState<Movement[]>([]);

  const getMovements = async (ids: { $oid: string }[]) => {
    try {
        const response = await API.getMovementByIds(ids);
        setMovements(response.data.data);
    } catch(error) {
        console.log('Logging: getting movements error');
        console.log(error);
    }
  };

  const handleMovements = (program: any) => {
    const movementIds: { $oid: string }[] = [];
    program.session.forEach((session: any) => {
      movementIds.push(...session.movementId);
    });
    getMovements(movementIds);
  };

  const contextValue: MovementsContextValue = {
    movements,
    handleMovements,
  };

  return (
    <MovementsContext.Provider value={contextValue}>
      {children}
    </MovementsContext.Provider>
  );
};
