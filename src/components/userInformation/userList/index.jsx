import {
    Box,
    Input,
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
} from "@chakra-ui/react"
import { Link as LinkRouter } from "react-router"
import { v4 as uuid } from "uuid"
import { AiOutlineFileSearch } from "react-icons/ai";
import { IoEllipsisHorizontalOutline } from "react-icons/io5";
import { TbHeartPlus } from "react-icons/tb";
import { ChevronRight } from "lucide-react";
import {
    useList,
    useChangeList,
    useModalAddList,
    useAddList
} from "./userList.service";
import { Fragment } from "react"

export default function UserList() {
    const {
        lists,
        handleAddList,
        setLists
    } = useList();
    const {
        isOpen,
        onOpen,
        onClose
    } = useModalAddList();
    return (
        <Box
            width="912px">
            <Box
                width="100%"
                display="flex"
                flexWrap="wrap"
                marginBottom="20px"
                paddingTop="20px"
                paddingLeft="20px"
                paddingRight="20px"
                paddingBottom="20px"
                backgroundColor="#fff"
            >
                {(lists.length > 0) ? lists.map(i => {
                    return <List list={i} key={uuid()} setLists={setLists} />
                }) :
                    (
                        <Flex
                            width="100%"
                            height="100%"
                            justifyContent="center"
                            alignItems="center"
                            flexDirection="column">
                            <Icon
                                as={AiOutlineFileSearch}
                                width="50px"
                                height="50px"
                                color="#999" />
                            <Text
                                fontSize="1rem"
                                fontWeight="400"
                                color="#999">
                                Aún no tienes listas creadas.
                            </Text>
                        </Flex>
                    )}
            </Box>
            <Flex
                width="100%"
                backgroundColor="#fff"
                p="20px"
                direction="row"
                justifyContent="center"
                alignItems="center">
                <Button
                    onClick={onOpen}>
                    Crear lista
                </Button>
            </Flex>
            <ModalAddList
                isOpen={isOpen}
                onClose={onClose}
                handleAddList={handleAddList} />
        </Box>
    );
}

function List({ list, setLists }) {
    const { lista_id, nombre, imagenes } = list;
    const { isOpen, onOpen, onClose, actions } = useChangeList(lista_id, setLists);
    return (
        <Box
            width="100%"
            minHeight="100px"
            alignItems="center"
            padding="12px"
            marginBottom="8px"
            border="1px solid #fafafa"
            boxShadow="0px 2px 2px rgba(0, 0, 0, 0.1)"
            borderRadius="10px"
        >
            <Flex justify="space-between">
                <Text
                    fontSize="1rem"
                    fontWeight="400"
                    color="#333">{nombre}</Text>
                <Icon
                    as={IoEllipsisHorizontalOutline}
                    cursor="pointer"
                    onClick={onOpen} />
            </Flex>
            <Flex>
                {
                    (imagenes.length > 0) ?
                        (
                            <Box>
                                <Text
                                    as="span"
                                    fontWeight="400"
                                    color="#999"
                                    fontSize="0.8rem"
                                    grp="10px">{imagenes.length} producto{(imagenes.length > 1) ? "s" : ""}</Text>
                                <Flex
                                    direction="row">
                                    {imagenes.map(i => {
                                        return <Image width="40px" height="40px" src={i} key={uuid()} />
                                    })}
                                </Flex>
                            </Box>
                        ) :
                        <Text
                            as="span"
                            fontWeight="400"
                            color="#999"
                            fontSize="0.8rem"
                            grp="10px"
                        >
                            Aún no agregas productos a tu lista
                        </Text>
                }
            </Flex>
            <Flex justify="end">
                <Link
                    as={LinkRouter}
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="center"
                    _hover={{ textDecoration: "none" }}>
                    <Text
                        letterSpacing="0.14px"
                        color="#4a4a4a"
                        fontStyle="normal"
                        fontWeight="400"
                        fontSize="10px"
                        lineHeight="18px"
                        textAlign="justify"
                    >
                        Revisar lista
                    </Text>
                    <ChevronRight width="10px" height="16px" />
                </Link>
            </Flex>
            <ModalList
                isOpen={isOpen}
                onClose={onClose}
                actions={actions}
                name={nombre} />
        </Box>
    );
}

function ModalList({ isOpen, onClose, actions, name }) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Modificar lista</ModalHeader>
                <ModalCloseButton
                    color="black" />
                <ModalBody
                    display="flex"
                    flexDirection="column">
                    {actions.map((action, index) => {
                        return (
                            <Fragment
                                key={uuid()}>
                                <action.Component
                                    key={uuid()}
                                    name={name} />
                                <Button
                                    key={index}
                                    display="flex"
                                    flexDirection="row"
                                    alignItems="center"
                                    justifyContent="flex-start"
                                    width="100%"
                                    marginBottom="10px"
                                    backgroundColor="#fff"
                                    color="#333"
                                    borderRadius="10px"
                                    padding="10px"
                                    onClick={action.callback}
                                >
                                    <Icon
                                        as={action.icon}
                                        stroke="1"
                                        mr="10px"
                                    />
                                    {action.name}
                                </Button>
                            </Fragment>
                        )
                    })}

                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

function ModalAddList({ isOpen, onClose, handleAddList }) {
    const {
        getName,
        clear,
        handleChange
    } = useAddList();
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <Icon
                        as={TbHeartPlus}
                        width="20px"
                        height="20px"
                        color="#333" />
                    Crear una nueva lista
                </ModalHeader>
                <ModalCloseButton
                    color="black" />
                <ModalBody
                    display="flex"
                    flexDirection="column">
                    <Text
                        fontSize="1rem"
                        fontWeight="400"
                        color="#333">Ingresa un numbre a la lista</Text>
                    <Input
                        type="text"
                        placeholder="Nombre de la lista"
                        value={getName}
                        onChange={handleChange} />
                </ModalBody>
                <ModalFooter
                    width="100%"
                    display="flex"
                    justifyContent="center"
                    alignItems="center">
                    <Button colorScheme="blue" mr={3} onClick={(e) => {
                        handleAddList(getName)(e);
                        clear(e);
                        onClose(e);
                    }}>
                        Guardar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}