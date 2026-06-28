"use client"

import { useAuth } from "@/src/hooks/useAuth";
import { signup } from "@/src/services/auth.services";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react"

export default function SignUp() {
    const router = useRouter();
    const { fetchUser } = useAuth();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    async function submitHandler(e: any) {
        e.preventDefault();
        try {
            await signup(formData);
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
                ...prev,
                [name]: value,
            }
        })
    }
    return (<form onSubmit={submitHandler}>
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
            PASSWORD
            <input
                type="password"
                placeholder="password"
                value={formData.password}
                onChange={changeHandler}
                name="password"
            ></input>
        </label>
        <button>SIGNUP</button>
    </form >
    );
}