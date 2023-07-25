import React, {createContext, useContext} from "react";
import { useFieldArray, useForm, UseFormReturn } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface Tracking {
    type: string;
    trackingDetails: object;
    reps: number;
    sets: number;
    rounds: number;
    roundMinute: number;
    roundSecond: number;
    restMinute: number;
    restSecond: number;
    gMinute: number;
    gSecond: number;
}


interface Movement {
    section: string;
    movementName: string;
    movementDescription: string;
    movementLink: string;    
    tracking: Tracking;
}

interface Session {
    sessionName: string;
    restDays: number;
    movements: Movement[];
}

interface FormData {
    programName: string;
    programDescription: string;
    programCategory: string;
    sessions: Session[];    
}


interface FormContextValue extends UseFormReturn<FormData>{}

const FormContext = createContext<FormContextValue | null>(null);

export const useFormContext = () => {
    const context = useContext(FormContext);
    if(!context){
        throw new Error('useFormContext must be used within a FormProvider');
    }
    return context;
}

const FormProvider = ({children}) => {
    const methods = useForm<FormData>({
        defaultValues: {
            programName: '',
            programDescription: '',
            programCategory: "undefined",   
            // sessions:[]         
        },
        resolver: yupResolver(yup.object().shape({
            programName: yup.string().required('First name is Required'),
            programDescription: yup.string().required('Program Description is Required'),
            programCategory: yup.string().
            required('Please select an option').
            oneOf(['strength', 'yoga']),    
            sessions: yup
                .array()
                .of(
                    yup.object().shape({
                        sessionName: yup.string().required('Session name is required'),
                        restDays: yup.number().required('Rest days are required'),
                        movements: yup.array().of(
                            yup.object().shape({
                                section: yup.string().required('Movement section is require'),
                                movementName: yup.string().required('asdas'),
                                movementDescription: yup.string().required("sedasda"),
                                movementLink: yup.string().required('asdasd'),
                                tracking: yup.object().shape({
                                    type: yup.string().required('dasdasd'),                                    
                                    reps: yup.number(),
                                    sets: yup.number(),
                                    rounds: yup.number(),
                                    roundMinute: yup.number(),
                                    roundSecond: yup.number(),
                                    restMinute: yup.number(),
                                    restSecond: yup.number(),
                                    gMinute: yup.number(),
                                    gSecond: yup.number(),
                                }),
                            })
                        )
                    })
                )
                .required('Sessions are required'),
        }))
    });    
    
    return (
        <FormContext.Provider value = {{...methods }}>
            {children}
        </FormContext.Provider>
    )    
}
export default FormProvider;