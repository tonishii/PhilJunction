import { makeServerURL } from "@/hook/url";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function RandoUser() {
    const navigate = useNavigate();
    useEffect(() => {
        async function t() {
            const randouser = await fetch(makeServerURL(`randomuser`));
            navigate(`/user/${(await randouser.json()).username}`);
        }
        t()

    }, [])

    return (
        <div></div>
    )
}