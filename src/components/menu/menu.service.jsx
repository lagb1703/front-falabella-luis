import { useState, useEffect, useCallback, useRef } from "react";
import { useDisclosure } from "@chakra-ui/react";
import navigationOptionsMock from "./mocks/navigationOptions.mock.json"
import subNavigationOptionsMock from "./mocks/submenus.mock.json"
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
    const [getIndex, setIndex] = useState({});
    const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();
    useEffect(()=>{
        if(!isModalOpen)
            setHoverFocus("");
    }, [isModalOpen]);
    const hoverOpen = useCallback((index)=>{
        return (e)=>{
          e.preventDefault();
          if(e.target[Object.keys(e.target)[1]]["keyid"] == index.keyid){
              setHoverFocus(index);
              setIndex(index);
              onModalOpen(e);
          }
        };
    }, [])
    return{
        getHoverFocus,
        hoverOpen,
        getIndex,
        isModalOpen,
        onModalClose
    }
}

export function useCloseMenu(isOpen, onModalClose){
    useEffect(()=>{
        if(!isOpen){
            document.body.style.overflow = 'scroll';
            onModalClose()
            return
        }
        document.body.style.overflow = 'hidden';
    }, [isOpen]);
}

export function useGetSubMenu(){
    const [getSubMenu, setSubMenu] = useState([]);
    const [getMenuId, setMenuId] = useState("");
    const subMenuCache = useRef(new Map())
    useEffect(()=>{
        let subMenu = subMenuCache.current.get(getMenuId);
        if(!subMenu){
            subMenu = subNavigationOptionsMock.filter((item)=>item["menu_id"] == getMenuId);
            if(subMenu.length > 0)
                subMenuCache.current.set(getMenuId, subMenu);
        }
        setSubMenu(subMenu);
    }, [getMenuId]);
    return {getSubMenu, setMenuId};
}

export function useLoadMenu(index){
    const {getSubMenu, setMenuId} = useGetSubMenu();
    useEffect(()=>{
        setMenuId(index["menu_id"]);
    }, [index]);
    return getSubMenu;
}