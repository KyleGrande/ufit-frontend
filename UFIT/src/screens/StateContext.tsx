import React, {createContext, useContext} from "react";
import { useForm, UseFormReturn } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface FormData {
    programName: string;
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

const FormProvider: React.FC = ({children}) => {
    const methods = useForm<FormData>({
        defaultValues: {},
        resolver: yupResolver(yup.object().shape({
            programName: yup.string().required('First name is Required'),
        })),
    });    
      
    return (
        <FormContext.Provider value = {methods}>
            {children}
        </FormContext.Provider>
    )    
}
export default FormProvider;