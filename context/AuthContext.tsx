import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import Router from "next/router";

import jwtDecode from "jwt-decode";

type SignInData = {
    email: string;
    password: string;
};

type User = {
    _id: string;
    firstName: string;
    email: string;
};

type AuthContextType = {
    isAuthenticated: boolean;
    signIn: (data: SignInData) => Promise<void>;
    signOut: () => void;
    user: User | null;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: any) {
    const [user, setUser] = useState<User | null>(null);
    const isAuthenticated = !!user;

    useEffect(() => {
        const getUserInfo = async () => {
            const { "@opennotes:token": token } = parseCookies();
            if (token) {
                const { data } = await api.get<User>(`/users/me`);
                setUser(data);
                console.log(data);
            }
        };
        getUserInfo();
    }, []);

    async function signIn({ email, password }: SignInData) {
        const { data } = await api.put<{ token: string }>("/users/login", {
            email,
            password,
        });

        setCookie(undefined, "@opennotes:token", data.token, {
            maxAge: 60 * 60 * 8, // 8 hours
        });

        api.defaults.headers["Authorization"] = `Bearer ${data.token}`;

        // Seta usuário
        const response = await api.get<User>(`/users/me`);
        setUser(response.data);

        const decoded: { id: string; verified: boolean } = jwtDecode(data.token);

        if (!decoded.verified) {
            Router.push("confirm_account/");
            return;
        }

        Router.push("/home");
    }

    function signOut() {
        api.defaults.headers["Authorization"] = ``;
        destroyCookie(undefined, "@opennotes:token");
        Router.push("/signin");
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, signIn, signOut, user }}>
            {children}
        </AuthContext.Provider>
    );
}
