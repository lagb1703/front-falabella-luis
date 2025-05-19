import { usePaymentData } from "./paymentButton.service";
import { Button } from "@chakra-ui/react"

export default function EpaycoButton() {
    usePaymentData();
    return (<Button id="pay-btn">Pagar</Button>);
};
