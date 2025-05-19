import { useEffect, useState, useContext, useCallback } from "react";
import userContext from "@/gobal/user/user.context";
import { useLocation, useNavigate } from "react-router";
import {
    CircleUserRound,
    House,
    Banknote,
    Heart,
    Power,
    FileLock,
    HandCoins
} from 'lucide-react';
const defaulNavigatetionUser = [
    {
        name: "Datos Personales",
        icon: CircleUserRound,
        href: "/myAccount",
        callBack: null,
        isActive: false,
    },
    {
        name: "Direcciones",
        icon: House,
        href: "/myAccount/myAddress",
        callBack: null,
        isActive: false,
    },
    {
        name: "Medios de pago",
        icon: Banknote,
        href: "/myAccount/myPayments",
        callBack: null,
        isActive: false,
    },
    {
        name: "Datos para reembolso",
        icon: HandCoins,
        href: "/myAccount/reimbursements",
        callBack: null,
        isActive: false,
    },
    {
        name: "Mis listas",
        icon: Heart,
        href: "/myAccount/myLists",
        callBack: null,
        isActive: false,
    },
    {
        name: "Configurar mi cuenta",
        icon: FileLock,
        href: "/myAccount/reimbursements",
        callBack: null,
        isActive: false,
    },
    {
        name: "Pagar mi CMR",
        icon: Heart,
        href: "/myAccount/reimbursements",
        callBack: null,
        isActive: false,
    }
];

export function useGetNavigationUser() {
    const location = useLocation();
    const setNavigate = useNavigate();
    const { setUser } = useContext(userContext);
    const [getNavigationUser, setNavigationUser] = useState(defaulNavigatetionUser);
    const closeSession = useCallback((e)=>{
        e.preventDefault();
        setUser(null);
        setNavigate("/");
    }, [setUser, setNavigate]);
    useEffect(() => {
        const newNavigationUser = defaulNavigatetionUser.map((item) => {
            const regex = new RegExp(`^${item.href.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}$`);
            item.isActive = regex.test(location.pathname);
            return item
        });
        newNavigationUser.push(
            {
                name: "Cerrar sesión",
                icon: Power,
                href: "/",
                callBack: closeSession,
                isActive: false,
            })
        setNavigationUser(newNavigationUser);
    }, [location.pathname]);
    return getNavigationUser
}