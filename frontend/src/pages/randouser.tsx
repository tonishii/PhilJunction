import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function RandoUser() {
    const navigate = useNavigate();
    useEffect(() => {
        async function t() {
            const randouser = await fetch("http://localhost:3001/randomuser");
            navigate(`/user/${(await randouser.json()).username}`);
        }
        t()

    }, [])

    return (
        <div></div>
    )
}