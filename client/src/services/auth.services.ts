import { api } from "../lib/api";
import { signinType, signupType, } from "../types/auth.types";

export async function signin(signinPayload: signinType) {
    const result = await api.post("/signin", signinPayload);
    return result.data;
}

export async function signup(signupPayload: signupType) {
    const result = await api.post("/signup", signupPayload);
    return result.data;
}

export async function logout() {
    const result = await api.post("/logout");
    return result.data;
}

export async function me() {
    const result = await api.get("/me");
    return result.data;
}