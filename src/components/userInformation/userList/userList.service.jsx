import {
    Box,
    Flex,
    Button,
    Text,
    Icon,
    Image,
    Link,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Input
} from "@chakra-ui/react"
import {
    useState,
    useContext,
    useEffect,
    useCallback,
    useRef
} from "react";
import userContext from "@/gobal/user/user.context";
import imageContext from "@/gobal/image/image.context";
import listsMock from "./mock/list.mock.json";
import {
    backendURL,
    isDevelopment
} from "@/pages/index";
import { useDisclosure } from "@chakra-ui/react";
import {
    PencilLine,
    CircleAlert
} from "lucide-react";
import { FaRegTrashCan } from "react-icons/fa6";

export function useList() {
    const { getUser } = useContext(userContext);
    const { getImage } = useContext(imageContext);
    const [getLists, setLists] = useState([]);
    useEffect(() => {
        if (!getUser)
            return;
        (async () => {
            const lists = await getListByUserId(getUser["usuario_id"]);
            const listsWithImage = await Promise.all(lists.map(async (list) => {
                list.imagenes = await Promise.all(list.imagenes.map(async (image) => {
                    return await getImage(image);
                }));
                return list;
            }));
            setLists(listsWithImage);
        })();
    }, []);
    const handleAddList = useCallback((name) => {
        return (e) => {
            e.preventDefault();
            const response = postList(getUser["usuario_id"], name);
            response.then((data) => {
                setLists((prev) => {
                    setLists((prev) => {
                        prev.push(data);
                        return prev;
                    });
                    return prev;
                });
            }).catch(err => {
                console.log(err);
            })
        }
    }, [getLists]);
    return {
        lists: getLists,
        handleAddList,
        setLists
    };
}

export function useChangeList(lista_id, setLists) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure();
    const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure();
    const actions = useRef();
    actions.current = [
        {
            name: "Editar Nombre",
            icon: PencilLine,
            callback: useCallback((e) => {
                e.preventDefault();
                onOpenEdit();
            }, []),
            Component: ({ name }) => {
                const [getName, setName] = useState(name);
                return (
                    <Modal
                        isOpen={isOpenEdit}
                        onClose={onCloseEdit}
                        isCentered>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>
                                <Icon as={PencilLine} />
                                Editar Nombre
                            </ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Input
                                    type="text"
                                    placeholder="Nuevo nombre"
                                    value={getName}
                                    onChange={(e) => {
                                        e.preventDefault();
                                        setName(e.target.value);
                                    }} />
                            </ModalBody>
                            <ModalFooter
                                width="100%"
                                display="flex"
                                justifyContent="center"
                                alignItems="center">
                                <Button colorScheme="blue" mr={3} onClick={(e) => {
                                    e.preventDefault();
                                    patchListName(lista_id, getName);
                                    onCloseEdit();
                                    setLists((prev) => {
                                        return prev.map((list) => {
                                            if (list.lista_id === lista_id) {
                                                list.nombre = getName;
                                            }
                                            return list;
                                        });
                                    });
                                }}>
                                    Guardar
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                )
            }
        },
        {
            name: "Eliminar Lista",
            icon: FaRegTrashCan,
            callback: useCallback(async (e) => {
                e.preventDefault();
                onOpenDelete();
            }, []),
            Component: () => {
                return (
                    <Modal
                        isOpen={isOpenDelete}
                        onClose={onCloseDelete}
                        isCentered>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>
                                <Icon
                                    as={CircleAlert}
                                    color="yellow" />
                                Eliminar Nombre
                            </ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                ¿Realmente quieres eliminar la lista Compu?
                            </ModalBody>
                            <ModalFooter>
                                <Button variant="ghost" onClick={onCloseDelete}>Cancelar</Button>
                                <Button mr={3} onClick={() => {
                                    deleteList(lista_id).catch((error) => {
                                        console.log(error);
                                    });
                                    setLists((prev) => {
                                        return prev.filter((list) => list.lista_id !== lista_id);
                                    });
                                    onCloseDelete();
                                }}>
                                    Eliminar
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                )
            }
        }
    ]
    return {
        isOpen,
        onOpen,
        onClose,
        actions: actions.current
    }
}

export function useModalAddList() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return {
        isOpen,
        onOpen,
        onClose,
    }
}

export function useAddList() {
    const [getName, setName] = useState("");
    const handleChange = useCallback((e) => {
        e.preventDefault();
        setName(e.target.value);
    }, [setName]);
    const clear = useCallback((e) => {
        e.preventDefault();
        setName("");
    }, [setName]);
    return {
        getName,
        clear,
        handleChange
    }
}

async function getListByUserId(userId) {
    if (isDevelopment)
        return listsMock;
    const response = await fetch(`${backendURL}user/${userId}/lists`);
    if (!response.ok) {
        throw new Error("Error al cargar la lista");
    }
    const data = await response.json();
    return data;

}

async function postList(userId, name) {
    if (isDevelopment)
        return {
            lista_id: listsMock.length + 1,
            nombre: name,
            imagenes: []
        };
    const response = await fetch(`${backendURL}user/${userId}/lists`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name
        })
    });
    if (!response.ok) {
        throw new Error("Error al cargar la lista");
    }
    const data = await response.json();
    return data;
}

async function patchListName(listId, name) {
    if (isDevelopment)
        return;
    const response = await fetch(`${backendURL}list/${listId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nombre: name
        })
    });
    if (!response.ok) {
        throw new Error("Error al cargar la lista");
    }
    const data = await response.json();
    return data;
}

async function deleteList(listId) {
    if (isDevelopment)
        return;
    const response = await fetch(`${backendURL}list/${listId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });
    if (!response.ok) {
        throw new Error("Error al cargar la lista");
    }
    const data = await response.json();
    return data;
}