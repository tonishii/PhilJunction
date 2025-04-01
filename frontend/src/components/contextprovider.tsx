import { useLocalStorage } from "@/hook/storage";
import { useState } from "react";
import { ThemeContext, AuthContext } from "@/hook/context";

export default function ContextProviders({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useLocalStorage("theme", "light");
    document.documentElement.setAttribute("data-theme", theme);
    const [user, setUser] = useState<null | string>(null);
    return (

        <ThemeContext.Provider value={[theme, setTheme]}>
            <AuthContext.Provider value={[user, setUser]}>
                {children}
            </AuthContext.Provider>
        </ThemeContext.Provider>
    )

}