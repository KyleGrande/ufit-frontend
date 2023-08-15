export type Program = {
    _id: { $oid: string};
    originalProgramId?: { $oid: string};
    programName: string;
    programDescription: string;
    programCategory: string;
    userId: string;
    session: Session[];
    __v?: { $numberInt: string };

};
export type NewProgram = {
    _id?: { $oid: string};
    originalProgramId?: { $oid: string};
    programName: string;
    programDescription: string;
    programCategory: string;
    userId: string;
    session: Session[];
    __v?: { $numberInt: string };
};
export type Session = {
    name: string;
    // restDays: number;
    movementId: { $oid: string }[];
    _id: string;
};

export type Movement = {
    _id: {$oid: string};
    movementName: string;
    movementDescription: string;
    movementLink: string;
    typeTracking: typetracking;
};
export type typetracking = {
    trackingType: string;
    sets: number;
    reps: number;
    weight: number;
    time: number;
    rounds: number;
    rest: number;
    restMin: number;
    restSec: number;
    roundMin: number;
    roundSec: number;
    notes?: string;
};
export type TrackingDataSchema = {
    trackingType: string;
    reps?: number;
    setsCompleted?: number;
    roundsCompleted?: number;
    roundSecRemain?: number;
    roundMinRemain?: number;
    speed?: number;
    weight?: number;
    notes?: string;
};

export type MovementHistory = {
    // _id: string;
    movementId: {$oid: string};
    movementName: string;
    section: string;
    trackingData: TrackingDataSchema[];
};
export type WorkoutHistory = {
    // _id: string;
    programId?: {$oid: string};
    programName: string;
    sessionName: string;
    // userId: {$oid: string};
    userId: string,
    date: Date;
    movements: MovementHistory[];
};



import axios from "axios";

export const api = axios.create({
    // baseURL: 'http://54.205.215.210:3000/api',
    // baseURL: 'http://localhost:3000/api',
    baseURL: 'http://192.168.0.209:3000/api',

});

export default {
    getPrograms: () => api.get('/program'),
    getProgramsByUserId: (userId: string) => api.get(`/program/by-userId/${userId}`),
    addProgram: (newProgram: NewProgram) => api.post('/program', newProgram),
    insertProgram: (newProgram: Program) => api.post('/program', newProgram),
    updateProgram: (updatedProgram: Program) => api.put('/program/by-id', updatedProgram),
    deleteProgram: (id: string) => api.delete(`/program/by-id/${id}`),
    getMovementByIds: (ids: {$oid:string}[]) => api.post(`/movement/by-ids/`, {ids}),
    insertWorkoutHistory: (newWorkoutHistory: WorkoutHistory) => api.post('/workout-history', newWorkoutHistory),
    addMovement: (newMovement: Movement) => api.post('/movement', newMovement),
    getHistoryByProgramId: (programId: {$oid:string}) => api.get(`/workout-history/by-program-id/${programId}`),
}
