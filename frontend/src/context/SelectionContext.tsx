import React from 'react';
import {newInversionista} from '../assets/data_inversionistas'
import {newProDucto} from '../assets/data_producto'
import {newCategoria} from '../assets/data_levantamiento'
import {newTipoDoc} from '../assets/data_documento'


interface SelectionContextType {
    // control filter LatMenu -> TableBusqueda
    selectedOption1: newInversionista | null;
    selectedOption2: newTipoDoc| null;
    selectedOption3: newProDucto | null;
    selectedOption4: newCategoria | null;
    setSelectedOption1: React.Dispatch<React.SetStateAction<newInversionista | null>>;
    setSelectedOption2: React.Dispatch<React.SetStateAction<newTipoDoc | null>>;
    setSelectedOption3: React.Dispatch<React.SetStateAction<newProDucto | null>>;
    setSelectedOption4: React.Dispatch<React.SetStateAction<newCategoria | null>>;
    // Avatar Leter
    nameUser: string | null;
    setNameUser: React.Dispatch<React.SetStateAction<string | null>>;
    // control login
    email: string | null;
    password: string | null;
    setEmail: React.Dispatch<React.SetStateAction<string | null>>;
    setPassword: React.Dispatch<React.SetStateAction<string | null>>;
    // control Rol access -> without Token
    sessionRol: number | null;
    setSessionRol: React.Dispatch<React.SetStateAction<number | null>>;
    // control filtro para carga de archivos latmenuLoadV2 -> FileUpload 
    isAutocomplete1Enabled: boolean;
    isAutocomplete2Enabled: boolean;
    isAutocomplete3Enabled: boolean;
    isAutocomplete4Enabled: boolean;
    setIsAutocomplete1Enabled:React.Dispatch<React.SetStateAction<boolean>>;
    setIsAutocomplete2Enabled:React.Dispatch<React.SetStateAction<boolean>>;
    setIsAutocomplete3Enabled:React.Dispatch<React.SetStateAction<boolean>>;
    setIsAutocomplete4Enabled:React.Dispatch<React.SetStateAction<boolean>>;
    // control refresh data user actualizar
    refresh: boolean;
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
    // captura Profile
    globalID: string;
    setGlobalID: React.Dispatch<React.SetStateAction<string>>;
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
    setSessionRol: () => {},
    isAutocomplete1Enabled:true,
    isAutocomplete2Enabled:true,
    isAutocomplete3Enabled:true,
    isAutocomplete4Enabled:true,
    setIsAutocomplete1Enabled: () => {},
    setIsAutocomplete2Enabled: () => {},
    setIsAutocomplete3Enabled: () => {},
    setIsAutocomplete4Enabled: () => {},
    refresh: false,
    setRefresh: () => {},
    globalID:'',
    setGlobalID: () => {},
    nameUser:'',
    setNameUser: () => {},
});