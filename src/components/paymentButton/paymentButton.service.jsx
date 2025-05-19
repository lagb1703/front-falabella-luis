import { useEffect, useContext } from 'react';
import shoppingCartContext from '@/gobal/shoppingCart/shoppingCart.context'
import { backendURL } from "@/pages";
import { useLocation } from 'react-router';

export function usePaymentData() {
    const location = useLocation();
    const { getCartProductsDetails } = useContext(shoppingCartContext);
    const handler = window.ePayco.checkout.configure({
        key: "871346455cd99bcee75e89e64513f335",
        test: true,
    });
    console.log(getCartProductsDetails)
    useEffect(() => {
        const host = window.location.host;
        const protocol = window.location.protocol;
        console.log(`${protocol}//${host}${location.pathname}`);
        const productsString = getCartProductsDetails.map((item) => {
            return item["_id"];
        }).join(", ");
        const precioTotal = getCartProductsDetails.reduce((result, i) => {
            return result + i.precio * (1 - i.descuento) * i.cantidad
        }, 0);
        (async () => {
            const data = {
                name: productsString,
                description: "varios productos",
                invoice: await getServerInvoice(),
                currency: "cop",
                amount: String(precioTotal),
                tax_base: "0",
                tax: "0",
                country: "co",
                lang: "es",
                response: `${protocol}//${host}${location.pathname}`,
                confirmation: `${backendURL}products/confirmacion`,
                external: "false",
            };
            document.getElementById("pay-btn").onclick = () => {
                handler.open(data);
            };
        })()
    }, [getCartProductsDetails]);
}

async function getServerInvoice() {
    try {
        const response = await fetch(`${backendURL}products/invoice`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.text();
        return data;
    } catch (error) {
        console.log(error);
        return "";
    }
}