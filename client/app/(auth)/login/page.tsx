"use client"

import { useAuth } from "@/src/hooks/useAuth";
import { signin } from "@/src/services/auth.services";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react"

export default function () {
    const router = useRouter();
    const { fetchUser } = useAuth();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    async function submitHandler(e: any) {
        e.preventDefault();
        try {
            await signin(formData);
            await fetchUser();
            setFormData({
                username: "",
                password: ""
            })
            router.replace("/problems");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                alert(error.response?.data.message);
            }
        }
    }

    function changeHandler(e: any) {
        const { name, value } = e.target;
        setFormData((prev) => {
            return {
                [name]: value,
                ...prev,
            }
        })
    }

    <form onSubmit={submitHandler}>
        <label>
            USERNAME
            <input
                type="text"
                placeholder="username"
                value={formData.username}
                onChange={changeHandler}
                name="username"
            ></input>
        </label>
        <div />
        <label>
            USERNAME
            <input
                type="text"
                placeholder="password"
                value={formData.password}
                onChange={changeHandler}
                name="password"
            ></input>
        </label>

    </form >
}