import { createContext } from "react";

export const ThemeContext = createContext<[string, (newValue: string) => void]>(["light", () => { }]);
export const AuthContext = createContext<[string | null, React.Dispatch<React.SetStateAction<string | null>>]>([null, () => { }]);
