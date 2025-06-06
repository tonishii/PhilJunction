import { useLocalStorage } from "@/hook/storage";
import { useState, useEffect } from "react";
import { ThemeContext, AuthContext } from "@helpers/context";
import { makeServerURL } from "@/helpers/url";

export default function ContextProviders({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useLocalStorage("theme", "light");
    document.documentElement.setAttribute("data-theme", theme);
    const [user, setUser] = useState<null | string>(null);

    useEffect(() => {
        async function checker() {
            try {
                const res = await fetch(makeServerURL("checkLoggedIn"), {
                    credentials: "include",
                });

                const resp = await res.json();
                setUser(resp.username);
            } catch (error) {
                console.error(error);
            }
        }
        checker();
    }, [])

    return (
        <ThemeContext.Provider value={[theme, setTheme]}>
            <AuthContext.Provider value={[user, setUser]}>
                {children}
            </AuthContext.Provider>
        </ThemeContext.Provider>
    )

}
