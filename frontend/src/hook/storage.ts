import { useState } from "react";

export function useLocalStorage(key: string, initialValue: string): [string, (newValue: string) => void] {
    const [value, setValue] = useState<string>(
        () => {
            const storedValue = localStorage.getItem(key);
            return storedValue === null ? initialValue : storedValue;
        }
    );

    const setter = (newValue: string) => {
        setValue(newValue);
        localStorage.setItem(key, newValue);
    };



    return [value, setter];
}