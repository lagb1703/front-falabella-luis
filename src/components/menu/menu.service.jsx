import { useState, useEffect, useCallback, useRef } from "react";
import { useDisclosure } from "@chakra-ui/react";
import navigationOptionsMock from "./mocks/navigationOptions.mock.json"
import subNavigationOptionsMock from "./mocks/submenus.mock.json"
import { v4 as uuid } from 'uuid';
import { useLocation } from 'react-router';
import { backendURL, isDevelopment } from "@/pages";

export function useGetNavigationOptions() {
    const [getNavigation, setNavigation] = useState([]);
    const fetchData = useCallback(async () => {
        try {
            const response = await fetch(`${backendURL}info/header`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            for (let i = 0; i < data.length; i++) {
                data[i]["keyid"] = uuid();
            }
            setNavigation(data);
        } catch (error) {
            console.error('Error fetching navigation options:', error);
        }
    }, []);
    useEffect(() => {
        if (isDevelopment) {
            for (let i = 0; i < navigationOptionsMock.length; i++) {
                navigationOptionsMock[i]["keyid"] = uuid();
            }
            setNavigation(navigationOptionsMock);
            return;
        }
        fetchData();
    }, []);
    return getNavigation;
}

export function useHover() {
    const [getHoverFocus, setHoverFocus] = useState("");
    const [getIndex, setIndex] = useState({});
    const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();
    useEffect(() => {
        if (!isModalOpen)
            setHoverFocus("");
    }, [isModalOpen]);
    const hoverOpen = useCallback((index) => {
        return (e) => {
            e.preventDefault();
            if (e.target[Object.keys(e.target)[1]]["keyid"] == index.keyid) {
                setHoverFocus(index);
                setIndex(index);
                onModalOpen(e);
            }
        };
    }, [])
    return {
        getHoverFocus,
        hoverOpen,
        getIndex,
        isModalOpen,
        onModalClose
    }
}

export function useCloseMenu(isOpen, onModalClose, onClose) {
    const location = useLocation();
    useEffect(() => {
        if (!isOpen) {
            document.body.style.overflowY = 'scroll';
            onModalClose()
            return
        }
        document.body.style.overflowY = 'hidden';
    }, [isOpen]);
    useEffect(() => {
        if (isOpen)
            onClose()
    }, [location]);
}

export function useGetSubMenu() {
    const [getSubMenu, setSubMenu] = useState([]);
    const [getMenuId, setMenuId] = useState("");
    const subMenuCache = useRef(new Map());
    const fetchData = useCallback(async () => {
        if (getMenuId == "") return;
        try {
            let subMenu = subMenuCache.current.get(getMenuId);
            if (!subMenu) {
                const data = await fetch(`${backendURL}info/header/${getMenuId}`);
                if (!data.ok) {
                    throw new Error('Network response was not ok');
                }
                subMenu = await data.json();
                if (subMenu.length > 0)
                    subMenuCache.current.set(getMenuId, subMenu);
            }
            setSubMenu(subMenu);
        } catch (error) {
            console.error('Error fetching navigation options:', error);
        }
    }, [getMenuId]);
    useEffect(() => {
        if (!getMenuId) return;
        if (isDevelopment) {
            let subMenu = subMenuCache.current.get(getMenuId);
            if (!subMenu) {
                subMenu = subNavigationOptionsMock.filter((item) => item["menu_id"] == getMenuId);
                if (subMenu.length > 0)
                    subMenuCache.current.set(getMenuId, subMenu);
            }
            setSubMenu(subMenu);
            return
        }
        fetchData();
    }, [getMenuId]);
    return { getSubMenu, setMenuId };
}

export function useLoadMenu(index) {
    const { getSubMenu, setMenuId } = useGetSubMenu();
    useEffect(() => {
        setMenuId(index["_id"]);
    }, [index]);
    return getSubMenu;
}