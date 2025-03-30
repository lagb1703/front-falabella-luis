import {
    Box,
    Flex,
    Divider,
    Link,
    Text,
    Icon
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router'
import { v4 as uuid } from 'uuid'
import { useGetNavigationOption } from './accountUserNavigationContent.service'
export default function AccountUserNavigationContent() {
    const getNavigationOptions = useGetNavigationOption();
    return (
        <Box
            as="nav"
            width="100%"
            height="94px"
            p="0px 8px"
            maxWidth="343px"
            justifyContent="center"
            align-items="center"
            gap="4px"
            borderRadius="10px"
            border="1px solid #F9F9F9"
            background="#FEFEFF"
            boxShadow="0px 2px 2px 0px rgba(29, 29, 29, 0.10)">
            <Flex
                as="div"
                width="100%"
                height="100%"
                direction="row"
                alignItems="center"
                gap="12px"
                alignSelf="stretch">
                {getNavigationOptions.map((option, index) => (
                    <>
                        {(index > 0) && <Divider
                            key={uuid()}
                            orientation="vertical"
                            width="1px"
                            height="62px"
                            bg="#F1F1F1" />}
                        <Link
                            as={RouterLink}
                            to={option.href}
                            borderBottom={option.borderBottom}
                            height="100%"
                            width="95px"
                            key={uuid()}
                            _hover={{ textDecoration: "none" }}>
                            <Flex
                                as="div"
                                direction="column"
                                alignItems="center"
                                gap="6px"
                                pt="15px">
                                <Icon
                                    as={option.icon}
                                    width="32px"
                                    height="32px"
                                    color="#343e49" 
                                    mb="5px"/>
                                <Text
                                    as="span"
                                    alignSelf="stretch"
                                    color="#343E49"
                                    textAlign="center"
                                    fontSize="14px"
                                    fontStyle="normal"
                                    fontWeight="700"
                                    lineHeight="14px">
                                    {option.name}
                                </Text>
                            </Flex>
                        </Link>
                    </>
                ))}
            </Flex>
        </Box>
    )
}