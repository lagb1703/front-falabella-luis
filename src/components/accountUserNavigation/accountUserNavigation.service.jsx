import { useEffect, useState } from "react";
import { useLocation } from "react-router";
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
        icon: HandCoins ,
        href: "/myAccount/myLists",
        callBack: null,
        isActive: false,
    },
    {
        name: "Mis listas",
        icon: Heart,
        href: "/myAccount/reimbursements",
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
    },
    {
        name: "Cerrar sesión",
        icon: Power,
        href: "/myAccount",
        callBack: null,
        isActive: false,
    }
];

export function useGetNavigationUser() {
    const location = useLocation();
    const [getNavigationUser, setNavigationUser] = useState(defaulNavigatetionUser);
    useEffect(()=>{
        const newNavigationUser = defaulNavigatetionUser.map((item) => {
            item.isActive = location.pathname.includes(item.href);
            return item
        });
        setNavigationUser(newNavigationUser);
    }, [location.pathname]);
    return getNavigationUser
}