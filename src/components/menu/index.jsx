import { useRef } from 'react';
import falabellaLogo from "@/assets/icons/logo-falabella-letras.svg"
import {useGetNavigationOptions, useHover, useCloseMenu} from "./menu.service";
import { Link as LinkRouter } from 'react-router';
import { FaAngleRight } from "react-icons/fa6";
import {
    Drawer,
    DrawerBody,
    HStack,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Box,
    Divider,
    Image,
    Flex,
    Text,
    Icon,
    Menu as MenuChakra,
    MenuList,
    MenuItem,
} from '@chakra-ui/react'


export default function Menu({isOpen, onClose}) {
    const btnRef = useRef();
    const {getHoverFocus, hoverOpen, isModalOpen, onModalClose} = useHover();
    const categorias = useGetNavigationOptions();
    useCloseMenu(isOpen, onModalClose);
    return (
      <>
        <Drawer
          isOpen={isOpen}
          placement='left'
          onClose={onClose}
          finalFocusRef={btnRef}
          size="min-xs">
        <DrawerOverlay />
        <DrawerContent
          maxW="225px">
          <DrawerHeader
            py="10px"
            px="16px"
            fontSize= "13px"
            lineHeight= "22.8px"
            fontWeight= "700"
            color="text.200"
            bg="#f7f7f7"
            borderTop="2px"
            borderColor="primary.500">
            <Flex
              direction="row"
              justifyContent="space-between"
              alignItems="center">
              ¡Hola!
              <DrawerCloseButton 
                onClick={onModalClose}
                mt="5px"
                size="sm"/>
            </Flex>
          </DrawerHeader>

          <DrawerBody
            p="0">
            <Box
              px="16px"
              py="16px">
                {categorias.map((category) => {
                  return (
                  <HStack
                    key={category.keyid}
                    py={2.5}
                    px={2}
                    borderLeftWidth={getHoverFocus == category.keyid ? "4px" : "0px"}
                    borderLeftColor="primary.500"
                    bg={getHoverFocus == category.keyid ? "#f7f7f7" : "white"}
                    cursor="pointer"
                    borderRadius="4px"
                    keyid={category.keyid}
                    onMouseEnter={hoverOpen(category.keyid)}>
                    <Text 
                      flex={1}
                      fontSize= "12px"
                      lineHeight= "19.2px"
                      fontWeight={getHoverFocus == category.keyid ? "700" : "400"}>
                      {category.name}
                      {category.isActive && (
                        <Box 
                          as="span" 
                          ml="10px"
                          px="6px"
                          py="3px"
                          bg="#0c2941" 
                          color="white" 
                          borderRadius="8px"   
                          fontSize= "7px"
                          lineHeight= "12px"
                          fontWeight= "700"
                          letterSpacing= ".4px">
                          SALE
                        </Box>
                      )}
                    </Text>
                    <Icon 
                      as={FaAngleRight} 
                      boxSize={3}
                      color={getHoverFocus == category.keyid ? "primary.500" : "#767676"}/>
                  </HStack>
              )}
            )
          }
          </Box>
          <Box
            width="100%"
            px="5px">
            <Divider
            borderWidth='1.5px'
            />
          </Box>
          <Box
            width="100%"
            px="32px"
            py="16px">
            <Flex
            width="100%"
            height="100%"
            justifyContent="center"
            alignItems="center"
            pr="3rem">
            <Image 
              src={falabellaLogo} 
              alt='falabellaLogo'
              height="100%"
              maxW="130px"/>
            </Flex>
          </Box>
          </DrawerBody>
        </DrawerContent>
        </Drawer>
        <SubMenu isModalOpen={isModalOpen} />
      </>
    )
}

function SubMenu({isModalOpen}){
  return(
      <MenuChakra 
        isOpen={isModalOpen}
        closeOnSelect={false}>
        <MenuList 
          position="fixed"
          top="59px"
          left="225px"
          minWidth='240px'
          zIndex="1401"
          pt="24px"
          pb="64px"
          pr="8px"
          pl="32px"
          minH="468px"
          maxH="904px"
          height="100vh"
          borderLeft="0">
            <MenuItem as="section">
              <Flex
                direction="row"
                height="fit-content">
                  <Flex
                    width="fit-content"
                    height="100%"
                    direction="row"
                    alignItems="center"
                    flex="2 0 auto"
                    bg="gradient"
                    pr="20px"
                    color="#fff"
                    fontFamily= "Lato"
                    fontWeight= "900"
                    fontSize= "24px"
                    marginRight= "20px"
                    lineHeight= "28.8px"
                    borderRadius= "80px 0 140px 80px">
                    <Box
                      width= "56px"
                      height= "56px"
                      borderRadius= "50%"
                      bg="#AAD500"></Box>
                    <LinkRouter>
                      <Text>
                        Link example
                      </Text>
                    </LinkRouter>
                  </Flex>
                  <Flex
                    alignItems="center">
                    <LinkRouter>
                      <Text
                        textAlign="center"
                        fontSize= "14px"
                        lineHeight= "16.8px"
                        color= "#68717d"
                        textDecoration= "underline !important"
                        textUnderlinePosition= "under">
                        Ver Todo
                      </Text>
                    </LinkRouter>
                  </Flex>
              </Flex>
            </MenuItem>
            <MenuItem value='desc'>Descending</MenuItem>
        </MenuList>
      </MenuChakra>
  );
}