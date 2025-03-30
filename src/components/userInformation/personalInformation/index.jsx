import {
    Box,
    Text,
    Link,
    Image,
    Flex,
    Icon,
    Input,
    InputGroup,
    InputRightElement,
} from "@chakra-ui/react";
import {
    X
} from "lucide-react";
import {
    useGetInputPersonalInformation,
    useGetPersonalInformation,
    useValidateValue
} from "./personalInformation.service"
import { v4 as uuid } from "uuid"

export default function PersonalInformation() {
    const inputPersonalInformation = useGetInputPersonalInformation();
    const personalInformation = useGetPersonalInformation();
    return (
        <Flex
            as="form"
            width="100%"
            h="fit-content"
            direction="column">
            <Flex
                width="100%"
                direction="column"
                flexWrap="wrap"
                mb="12px"
                pt={{ base: "0", md: "20px" }}
                pl="20px"
                pr="20px"
                pb="20px"
                bg="#fff"
            >
                <Box
                    mb="12px">
                    <Text
                        as="h1"
                        fontSize="1.2rem"
                        fontWeight="400"
                        color="#333">Datos Personales</Text>
                </Box>
                <Flex
                    flexWrap="wrap"
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="stretch"
                    marginBottom="16px"
                    marginTop="16px"
                >

                    {
                        inputPersonalInformation.map((item) => {
                            console.log(personalInformation == null)
                            const {
                                isValid,
                                getValue,
                                handleChange,
                                handleCloseButtom
                            } = useValidateValue(
                                item.regex, 
                                (personalInformation != null)?
                                    personalInformation[item.defaultValueName]:
                                    "");
                            return (
                                <Flex
                                    key={item.id}
                                    direction="column"
                                    flexBasis={{ base: "100%", lg: "250px" }}>
                                    <Text
                                        as="label"
                                        fontWeight="400"
                                        fontSize="0.8rem"
                                        color="#333"
                                        htmlFor="userName">
                                        {item.label}
                                    </Text>
                                    <InputGroup>
                                        <Input
                                            id="userName"
                                            value={getValue}
                                            onChange={handleChange}
                                            width="100%"
                                            height="100%"
                                            background="transparent"
                                            borderRadius="none"
                                            border="none"
                                            outline="none"
                                            borderBottom={isValid?"1px solid #767676":"1px solid #e4022d"}
                                            color="#333"
                                            pl="0px"
                                            pr="0px"
                                            pb="5px"
                                            pt="14px"
                                            _placeholder={{ color: "#767676" }}
                                            _hover={{ background: "none", borderBottom: "1.5px solid #767676" }}
                                            type="text"
                                            placeholder={item?.placeholder}
                                            required />
                                        <InputRightElement>
                                            {(getValue.length > 0) &&
                                                <Icon
                                                    as={X}
                                                    onClick={handleCloseButtom}
                                                    cursor="pointer"
                                                    color={isValid?"#767676":"#e4022d"} />}
                                        </InputRightElement>
                                    </InputGroup>
                                    {!isValid &&
                                        <Text
                                            as="label"
                                            fontWeight="400"
                                            fontSize="0.7rem"
                                            color="#e4022d"
                                            htmlFor="userName">
                                            {item?.invalidMessage}
                                        </Text>}
                                </Flex>
                            )
                        })
                    }
                </Flex>
            </Flex>
            <Flex
                flexWrap="wrap"
                mb="12px"
                pt="20px"
                pl="20px"
                pr="20px"
                pb="20px"
                bg="#fff"
            >
            </Flex>
        </Flex>
    )
}