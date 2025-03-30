import { Navigate, Routes, Route } from "react-router";
import { v4 as uuidv4 } from 'uuid';
import {
    Box,
    Text,
    Link,
    Image,
    Flex,
    Icon
} from "@chakra-ui/react";
import {
    ChevronRightIcon
} from "lucide-react";
import PersonalInformation from "@/components/userInformation/personalInformation";
import { Link as RouterLink } from "react-router";
import { useLocalUserName } from "./accountPage.service";
import AccountUserNavigation from "@/components/accountUserNavigation";
import AccountUserNavigationContent from "@/components/accountUserNavigationContent";
export default function AccountPage() {
    const userName = useLocalUserName();
    return (
        <Box
            as="section"
            gb="#F1F1F1">
            <Box>
                <Box
                    pt="75px"
                    pb="75px"
                    bg="#FEFEFF">
                    <Flex
                        as="div"
                        direction="row"
                        justifyContent="space-between"
                        maxWidth={{base:"100%", "2xl":"1272px"}}
                        m={{base:"0 40px", "2xl":"0 auto"}}>
                        <Box>
                            <Box
                                as="div"
                                height="24px"
                                marginBottom="10px"></Box>
                            <Text
                                as="h1"
                                fontSize="32px"
                                lineHeight="36px"
                                mb="0"
                                color="text.400">Hola, {userName}</Text>
                        </Box>
                        <Link
                            as={RouterLink}
                            to="/element"
                            width="343px"
                            color="#333"
                            padding="8px"
                            height="72px"
                            borderRadius="10px"
                            bg="#F9F9F9"
                            boxShadow="0px 2px 2px 0px rgba(29, 29, 29, 0.10)"
                            maxWidth="343px"
                            display="grid"
                            gridAutoRows="1fr"
                            gridTemplateColumns="64px auto 1fr"
                            gridTemplateRows="1fr"
                            gap="4px"
                            alignItems="center"
                            _hover={{textDecoration:"none"}}>
                            <Image
                                src="https://www.falabella.com.co/a/fa/myAccount/static/styles/svg/cmrPuntos.svg"
                                alt="logo"
                                height="44px"
                                width="44px"
                                marginRight="4px"
                                justifySelf="center" />
                            <Box
                                as="div"
                                justifySelf="initial"
                                alignSelf="center"
                                fontSize="20px"
                                fontStyle="normal"
                                fontWeight="400"
                                lineHeight="24px">
                                <Flex
                                    as="div"
                                    alignItems="center">
                                    <Text
                                        as="p"
                                        fontWeight="700"
                                        fontSize="20px"
                                        fontStyle="normal"
                                        lineHeight="24px">Aún no tienes</Text>
                                    <Image 
                                        src="https://www.falabella.com.co/a/fa/myAccount/static/icons/svgs/cmrPointsText.svg"
                                        height="15px"
                                        marginLeft="4px"
                                        marginTop="9px"/>
                                </Flex>
                                <Text
                                    as="p"
                                    fontWeight="700"
                                    fontSize="12px"
                                    fontStyle="normal"
                                    lineHeight="16px">Descubre los canjes y beneficios</Text>
                            </Box>
                            <Flex
                                as="div"
                                width="100%"
                                height="100%"
                                justifyContent="center"
                                alignItems="center">
                                <Icon 
                                    as={ChevronRightIcon}
                                    marginLeft="auto"
                                    justifySelf="initial"
                                    alignSelf="center"
                                    height="24px"
                                    width="24px"
                                    color="#a6a6a6"/>
                            </Flex>
                        </Link>
                    </Flex>
                </Box>
                <Box
                    as="div"
                    m={{base:"0 40px", "2xl":"0 auto"}}
                    mt="-47px"
                    maxWidth="1272px">
                    <AccountUserNavigationContent />
                </Box>
            </Box>
            <Flex
                direction="row"
                gap="32px"
                m="32px 40px">
                <Box>
                    <AccountUserNavigation />
                </Box>
                <Routes>
                    <Route path="/" element={<PersonalInformation />} key={uuidv4()} />
                    <Route path="/element" element={<h1>Elemento 1</h1>} key={uuidv4()} />
                    <Route path="*" element={<Navigate to="/" replace />} key={uuidv4()} />
                </Routes>
            </Flex>
        </Box>
    );
}