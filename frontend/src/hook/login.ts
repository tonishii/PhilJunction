import { useEffect, useState } from "react";

export function useLoggedIn(): [boolean, string | null] {
    const [isLoggedIn, setIsloggedIn] = useState(false);
    const [username, setUsername] = useState<string | null>("");


    useEffect(() => {
        async function theThing() {
            const status = await fetch(import.meta.env.VITE_SERVER_URL + "checkLoggedIn", { credentials: "include" });
            const res = await status.json();
            setIsloggedIn(res.isLoggedIn);
            setUsername(res.username);
            console.log("hi tried fetching your stuff", res);
        }
        theThing();
    }, []);

    return [isLoggedIn, username];
}