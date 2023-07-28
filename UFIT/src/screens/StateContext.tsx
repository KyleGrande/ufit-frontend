import React, {createContext, useContext} from "react";
import { useFieldArray, useForm, UseFormReturn } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';


interface FormData {
    programName: string;
    programDescription: string;
    programCategory: string;
    sessions: Object[];    
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
            sessions:[]         
        },
        resolver: yupResolver(yup.object().shape({
            programName: yup.string().required('Program name is Required'),
            programDescription: yup.string().required('Program Description is Required'),
            programCategory: yup.string().
            required('Please select an option').
            oneOf(['strength', 'yoga']),    
            sessions: yup
                .array()
                .of(
                    yup.object()
                ).min(1, 'Minimum of 1 session is required to publish a program'),
        }))
    });    
    
    const sessionsFieldArray = useFieldArray({
        control: methods.control,
        name: 'sessions'
    });

    return (
        <FormContext.Provider value = {{...methods, ...sessionsFieldArray }}>
            {children}
        </FormContext.Provider>
    )    
}
export default FormProvider;