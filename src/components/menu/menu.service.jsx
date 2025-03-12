import { useState, useEffect, useCallback } from "react";
import { useDisclosure } from "@chakra-ui/react";
import navigationOptionsMock from "./mocks/navigationOptions.mock.json"
import { v4 as uuid } from 'uuid';

export function useGetNavigationOptions(){
    const [getNavigation, setNavigation] = useState([]);
    useEffect(()=>{
        for(let i = 0; i < navigationOptionsMock.length; i++){
          navigationOptionsMock[i]["keyid"] = uuid();
        }
        setNavigation(navigationOptionsMock);
    }, []);
    return getNavigation;
}

export function useHover(){
    const [getHoverFocus, setHoverFocus] = useState("");
    const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();
    useEffect(()=>{
        if(!isModalOpen)
            setHoverFocus("");
    }, [isModalOpen]);
    const hoverOpen = useCallback((index)=>{
        return (e)=>{
          e.preventDefault();
          if(e.target[Object.keys(e.target)[1]]["keyid"] == index){
              setHoverFocus(index);
              onModalOpen(e);
          }
        };
    }, [])
    return{
        getHoverFocus,
        hoverOpen,
        isModalOpen,
        onModalClose
    }
}

export function useCloseMenu(isOpen, onModalClose){
    useEffect(()=>{
        if(!isOpen){
        document.body.style.overflow = 'scroll';
        onModalClose()
        }
        document.body.style.overflow = 'hidden';
    }, [isOpen]);
}