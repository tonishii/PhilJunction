import { useLocalStorage } from "@/hook/storage";
import { useState, useEffect } from "react";
import { ThemeContext, AuthContext } from "@/hook/context";
import { makeServerURL } from "@/hook/url";

export default function ContextProviders({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useLocalStorage("theme", "light");
    document.documentElement.setAttribute("data-theme", theme);
    const [user, setUser] = useState<null | string>(null);

    useEffect(() => {
        async function checker() {
            const res = await fetch(makeServerURL(`checkLoggedIn`), {
                credentials: "include"
            })

            const resp = await res.json()
            setUser(resp.username)
        }
        checker();
    })
    return (

        <ThemeContext.Provider value={[theme, setTheme]}>
            <AuthContext.Provider value={[user, setUser]}>
                {children}
            </AuthContext.Provider>
        </ThemeContext.Provider>
    )

}