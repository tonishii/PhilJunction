import React, { useState, useEffect } from "react";
import "@/styles/toggle.css";



export default function Toggleswitch({ toggled, name }: { toggled?: boolean, name: string }) {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.setAttribute("data-theme", "dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.setAttribute("data-theme", "light");
            localStorage.setItem("theme", "light");
        }
    }, [isDarkMode]);

    const toggleMode = () => {
        if(name === "theme") //for particular change light/dark button
            setIsDarkMode(!isDarkMode);
    };

    return (
        <label className="switch">
            <input type="checkbox" checked={toggled} onClick={toggleMode} name={name} id={name} />
            <span className="slider"></span>
            
        </label> 
    )
}