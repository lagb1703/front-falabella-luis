import { 
    Box, 
    Text,
    Link,
    Icon
} from "@chakra-ui/react";
import {
    ChevronRight
} from "lucide-react"
import {v4 as uuid} from "uuid";
import {Link as RouterLink} from "react-router";
import { useGetNavigationUser } from "./accountUserNavigation.service";

export default function AccountUserNavigation(){
    const navigationUser = useGetNavigationUser();
    return (
        <Box
            as="nav"
            h="fit-content"
            border="1px solid #E2E8F0"
            backgroundColor="#fff"
            display="block flex"
            w="298px"
            p={{base:"0px", "2xl":"16px"}}
            gap={{base:"0px", "2xl":"16px"}}
            flexDirection="column"
            boxShadow="0 2px 2px 0 rgba(29, 29, 29, 0.10)"
            borderRadius="10px">
                {navigationUser.map((item) => {
                    return (
                        <Link
                            as={RouterLink}
                            to={item.href}
                            key={uuid()}
                            display="flex"
                            alignItems="center"
                            gap="10px"
                            color="#000"
                            fontSize="16px"
                            fontWeight={item.isActive ? "700" : "400"}
                            textDecoration="none"
                            p="16px 24px"
                            pr="20px"
                            bg={item.isActive ? "#F9F9F9" : "transparent"}
                            borderBottom="1px solid #E2E8F0"
                            _hover={{textDecoration:"none"}}
                            _active={{textDecoration:"none"}}
                        >
                            <Icon 
                                as={item.icon} />
                            <Text
                                mr="auto">{item.name}</Text>
                            <Icon 
                                as={ChevronRight} 
                                color="#343E49"
                                fontSize="16px" 
                                ml="auto" />
                        </Link>
                    )
                })}
        </Box>
    )
}