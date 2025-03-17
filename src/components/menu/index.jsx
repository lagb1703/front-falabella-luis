import { useRef } from 'react';
import falabellaLogo from "@/assets/icons/logo-falabella-letras.svg"
import {
  useGetNavigationOptions, 
  useHover, 
  useCloseMenu, 
  useLoadMenu
} from "./menu.service";
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
  MenuList
} from '@chakra-ui/react'
import { v4 as uuid } from 'uuid';


export default function Menu({isOpen, onClose}) {
    const btnRef = useRef();
    const {getHoverFocus, hoverOpen, getIndex, isModalOpen, onModalClose} = useHover();
    const categorias = useGetNavigationOptions();
    useCloseMenu(isOpen, onModalClose, onClose);
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
                    onMouseEnter={hoverOpen(category)}>
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
        <SubMenu isModalOpen={isModalOpen} getIndex={getIndex} />
      </>
    )
}

function SubMenu({isModalOpen, getIndex}){
  const subMenu = useLoadMenu(getIndex);
  return(
      <MenuChakra 
        isOpen={isModalOpen}
        closeOnSelect={false}>
        <MenuList 
          borderRadius= "0 20px 0 0"
          position="fixed"
          top="59px"
          left="225px"
          zIndex="1401"
          pt="24px"
          pb="64px"
          pr="8px"
          pl="32px"
          maxW={{base:"674px", lg:"904px"}}
          minW="468px"
          height="100vh">
          <Box
            height="100%"
            width="100%"
            overflowY="scroll"
            overflowX="hidden">
            <Box 
                as="section"
                width="100%">
                <Flex
                  direction="row"
                  height="fit-content"
                  width="100%">
                    <Flex
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
                      borderRadius= "80px 0 140px 80px"
                      minWidth="468px">
                      <Box
                        width= "56px"
                        height= "56px"
                        borderRadius= "50%"
                        mr="20px"
                        bg="#AAD500"></Box>
                      <LinkRouter>
                        <Text>
                          {getIndex.name}
                        </Text>
                      </LinkRouter>
                    </Flex>
                    <Flex
                      alignItems="center"
                      ml="1rem">
                      <LinkRouter
                        to={getIndex.href}>
                        <Text
                          textAlign="center"
                          fontSize= "14px"
                          lineHeight= "16.8px"
                          color= "#68717d"
                          textDecoration= "underline !important">
                          Ver Todo
                        </Text>
                      </LinkRouter>
                    </Flex>
                </Flex>
              </Box>
              <Flex
                justifyContent="center"
                mt="-8px">
                <Flex
                  flexDirection="column"
                  alignContent="flex-start"
                  justifyContent="flex-start"
                  boxSizing="border-box"
                  width="872px"
                  flexWrap="wrap"
                  maxHeight= {{base:"1410px", lg:"715px"}}>
                  {subMenu.map((item)=>{
                    return (
                      <Box
                        as="ul" 
                        display= "block"
                        width= "186px"
                        minWidth= "186px"
                        margin= "32px 32px 0 0"
                        key={item["subMenu_id"]}>
                        <Box
                          as="li">
                          <LinkRouter to={getIndex.href}>
                            <Text
                              m="0"
                              p="0"
                              fontSize= "19px"
                              fontWeight= "700"
                              lineHeight= "22.8px"
                              color="#68717D"
                              marginBottom= "12px">
                              {item.name}
                            </Text>
                          </LinkRouter>
                        </Box>
                        {item.options.map((i)=>{
                          return(
                            <Box
                              key={uuid()}
                              as="li"
                              mb="12px"
                              m="0"
                              p="0">
                              <LinkRouter to={i.link}>
                                {i.name !== "Ver todo"?<Text
                                  fontSize= "14px"
                                  lineHeight= "16px"
                                  fontWeight= "400"
                                  color= "#495867"
                                  marginBottom= "8px">
                                  {i.name}
                                </Text>:
                                <Text
                                  m="0"
                                  p="0"
                                  color= "#0c2941"
                                  fontWeight= "700"
                                  marginBottom= "8px">
                                Ver todo
                              </Text>
                              }
                              </LinkRouter>
                            </Box>
                          );
                        })}
                      </Box>
                    )
                  })}
                </Flex>
              </Flex>
            </Box>
        </MenuList>
      </MenuChakra>
  );
}