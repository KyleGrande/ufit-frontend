export type Program = {
    _id: string;
    programName: string;
    programDescription: string;
    programCategory: string;
    userId: { $oid: string };
    session: Session[];
    __v: { $numberInt: string };
};
type newProgram = {
    _id: { $oid: string };
    programName: string;
    programDescription: string;
    programCategory: string;
    userId: { $oid: string };
    session: Session[];
    __v: { $numberInt: string };
};
type updatedProgram = {
    _id: { $oid: string };
    programName: string;
    programDescription: string;
    programCategory: string;
    userId: { $oid: string };
    session: Session[];
    __v: { $numberInt: string };
};
type Session = {
    name: string;
    movementId: Array<string>;
    _id: string;
};
type id = string;

import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:3000/api',
});

export default {
    getPrograms: () => api.get('/program'),
    insertProgram: (newProgram) => api.post('/program', newProgram),
    updateProgram: (updatedProgram) => api.put('/program/by-id', updatedProgram),
    deleteProgram: (id) => api.delete(`/program/by-id/${id}`),
}
