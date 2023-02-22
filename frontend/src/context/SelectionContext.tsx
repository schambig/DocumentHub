import React from 'react';
import {newInversionista} from '../assets/data_inversionistas'
import {newProDucto} from '../assets/data_producto'
import {newCategoria} from '../assets/data_levantamiento'
import {newTipoDoc} from '../assets/data_documento'


interface SelectionContextType {
    selectedOption1: newInversionista | null;
    selectedOption2: newTipoDoc| null;
    selectedOption3: newProDucto | null;
    selectedOption4: newCategoria | null;
    setSelectedOption1: React.Dispatch<React.SetStateAction<newInversionista | null>>;
    setSelectedOption2: React.Dispatch<React.SetStateAction<newTipoDoc | null>>;
    setSelectedOption3: React.Dispatch<React.SetStateAction<newProDucto | null>>;
    setSelectedOption4: React.Dispatch<React.SetStateAction<newCategoria | null>>;
    email: string | null;
    password: string | null;
    setEmail: React.Dispatch<React.SetStateAction<string | null>>;
    setPassword: React.Dispatch<React.SetStateAction<string | null>>;
    sessionRol: number | null;
    setSessionRol: React.Dispatch<React.SetStateAction<number | null>>;
}

export const SelectionContext = React.createContext<SelectionContextType>({
    selectedOption1: null,
    selectedOption2: null,
    selectedOption3: null,
    selectedOption4: null,
    setSelectedOption1: () => {},
    setSelectedOption2: () => {},
    setSelectedOption3: () => {},
    setSelectedOption4: () => {},
    email: null,
    password: null,
    setEmail: () => {},
    setPassword: () => {},
    sessionRol:null,
    setSessionRol: () => {}
});