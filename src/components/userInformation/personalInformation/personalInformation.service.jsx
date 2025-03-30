import { useEffect, useState, useContext, useRef } from 'react';
import userContext from '@/gobal/user/user.context';
import PersonalInformation from './mocks/userInformation.mock';
const defaultInputPersonalInformation = [
    {
        id: "userName",
        label: "Nombre",
        regex: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
        placeholder: "Nombre",
        defaultValueName: "nombres",
        invalidMessage: "Ingresa un nombre válido"
    },
    {
        id: "userFirstLastName",
        label: "Primer apellido",
        regex: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
        placeholder: "Ingresa tu apellido",
        defaultValueName: "apellidos",
        invalidMessage: "Ingresa un apellido válido"
    },
    {
        id: "userSecondLastName",
        label: "Segundo apellido",
        regex: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
        placeholder: "Ingresa tu apellido",
        defaultValueName: "apellidos",
        invalidMessage: "Ingresa un apellido válido"
    }
]

export function useValidateValue(regex, defaultValue = "") {
    const [getValue, setValue] = useState(defaultValue);
    const [isValid, setIsValid] = useState(false);
    const handleChange = (e) => setValue(e.target.value);
    const handleCloseButtom = (e) => {
        e.preventDefault();
        setValue("");
    }
    useEffect(() => {
        if (getValue && regex) {
            setIsValid(regex.test(getValue));
            return;
        }
        setIsValid(false);
    }, [getValue]);

    return {
        isValid,
        getValue,
        handleChange,
        handleCloseButtom
    };
}

export function useGetInputPersonalInformation() {
    const [
        getInputPersonalInformation,
        setInputPersonalInformation
    ] = useState(defaultInputPersonalInformation);
    return getInputPersonalInformation;
}

export function useGetPersonalInformation() {
    const [getPersonalInformation, setPersonalInformation] = useState(null);
    const { correo } = useContext(userContext);
    useEffect(() => {
        const lastNames = PersonalInformation.apellidos.split(" ");
        PersonalInformation.primerApellido = lastNames.shift();
        PersonalInformation.segundoApellido = lastNames.join(" ");
        setPersonalInformation(PersonalInformation);
    }, []);
    return getPersonalInformation;
}