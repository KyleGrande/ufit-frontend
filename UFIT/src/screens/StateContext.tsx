import React, {createContext, useContext} from "react";
import { useForm, UseFormReturn } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface FormData {
    programName: string;
    programDescription: string;
    programCategory: string;
    
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

{/*
TODO:
    default picker value can be chosen from this context;
    Without moving 
*/}

const FormProvider = ({children}) => {
    const methods = useForm<FormData>({
        defaultValues: {
            programCategory: "undefined"
        },
        resolver: yupResolver(yup.object().shape({
            programName: yup.string().required('First name is Required'),
            programDescription: yup.string().required('Program Description is Required'),
            programCategory: yup.string().required('Please select an option').oneOf(['strength', 'yoga']),            
        })),
    });    
      
    return (
        <FormContext.Provider value = {methods}>
            {children}
        </FormContext.Provider>
    )    
}
export default FormProvider;