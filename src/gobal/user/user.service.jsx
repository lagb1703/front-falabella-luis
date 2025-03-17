import { useState } from "react";

export default function useUser() {
    const [getUser, setUser] = useState(null);
    return {
        getUser,
        setUser
    }
}