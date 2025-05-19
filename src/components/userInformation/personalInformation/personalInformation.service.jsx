import {
    useEffect,
    useState,
    useContext
} from 'react';
import userContext from '@/gobal/user/user.context';
import PersonalInformation from './mocks/userInformation.mock.json';
import { backendURL } from '@/pages';
import { useDisclosure } from '@chakra-ui/react';
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
        defaultValueName: "primerApellido",
        invalidMessage: "Ingresa un apellido válido"
    },
    {
        id: "userSecondLastName",
        label: "Segundo apellido",
        regex: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
        placeholder: "Ingresa tu apellido",
        defaultValueName: "segundoApellido",
        invalidMessage: "Ingresa un apellido válido"
    }
]

export function useValidateValue(regex, getPersonalInformation, defaultValue) {
    const [getValue, setValue] = useState("");
    const [isValid, setIsValid] = useState(false);
    const handleChange = (e) => setValue(e.target.value);
    const handleCloseButtom = (e) => {
        e.preventDefault();
        setValue("");
    }
    useEffect(() => {
        if (getPersonalInformation) {
            setValue(getPersonalInformation[defaultValue])
        }
    }, [getPersonalInformation]);
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
    const { getUser } = useContext(userContext);
    useEffect(() => {
        const person = {
            usuario_id: getUser.id,
            nombres: getUser.nombres,
            primerApellido: getUser.apellidos.split(" ")[0],
            segundoApellido: getUser.apellidos.split(" ").slice(1).join(" "),
            correo: getUser.correo,
            identificador: getUser.identificador,
            celular: getUser.celular,
        }
        console.log("getUser", person);
        setPersonalInformation(person);
    }, []);
    return getPersonalInformation;
}

export function useOpenChangeNumberModal() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return {
        isOpen,
        onOpen,
        onClose
    }
}

export function useChangeUserInformation() {
    const { getUser } = useContext(userContext);
    const { usuario_id } = getUser;
    const handleChangeUserInformation = async () => {
        try {
            const name = document.getElementById("userName").value;
            const firstLastName = document.getElementById("userFirstLastName").value;
            const secondLastName = document.getElementById("userSecondLastName").value;
            if (!name || !firstLastName) {
                throw new Error("Por favor completa todos los campos");
            }
            console.log("name", name);
            console.log("firstLastName", firstLastName);
            console.log("secondLastName", secondLastName);
            await chengeUserInformation(usuario_id, name, firstLastName, secondLastName);
        } catch (error) {
            throw error;
        }
    }
    return handleChangeUserInformation

}

async function chengeUserInformation(id, name, firstLastName, secondLastName) {
    try {
        const result = await fetch(`${backendURL}user/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                firstLastName,
                secondLastName
            })
        })
        if (!result.ok) {
            throw new Error("Error al actualizar la información del usuario");
        }
    } catch (e) {
        console.error(e);
    }
}