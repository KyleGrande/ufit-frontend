import React, {createContext, useContext} from "react";
import { useForm } from 'react-hook-form';

const FormContext = createContext({});

export const useFormContext = () => useContext(FormContext);

export const FormProvider = ({children}) => {
    const methods = useForm({
        defaultValues: {},
    })
    return <FormContext.Provider value = {methods}>{children}</FormContext.Provider>
}