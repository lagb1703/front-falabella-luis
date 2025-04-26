import { 
    useEffect, 
    useState, 
    useContext 
} from 'react';
import userContext from '@/gobal/user/user.context';
import AddressInformation from './mocks/addressInformation.mock.json';
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
    useEffect(()=>{
        if(getPersonalInformation){
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
    const { correo } = useContext(userContext);
    useEffect(() => {
        const lastNames = AddressInformation.apellidos.split(" ");
        AddressInformation.primerApellido = lastNames.shift();
        AddressInformation.segundoApellido = lastNames.join(" ");
        setPersonalInformation(PersonalInformation);
    }, []);
    return getPersonalInformation;
}

export function useOpenChangeNumberModal(){
    const {isOpen, onOpen, onClose} = useDisclosure();
    return{
        isOpen, 
        onOpen, 
        onClose
    }
}