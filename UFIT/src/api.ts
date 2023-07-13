export type Program = {
    _id: string;
    programName: string;
    programDescription: string;
    programCategory: string;
    userId: string;
    session: Session[];
    __v: { $numberInt: string };
};
export type Session = {
    name: string;
    movementId: { $oid: string }[];
    _id: string;
};

import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:3000/api',
});

export default {
    getPrograms: () => api.get('/program'),
    insertProgram: (newProgram: Program) => api.post('/program', newProgram),
    updateProgram: (updatedProgram: Program) => api.put('/program/by-id', updatedProgram),
    deleteProgram: (id: string) => api.delete(`/program/by-id/${id}`),
}
