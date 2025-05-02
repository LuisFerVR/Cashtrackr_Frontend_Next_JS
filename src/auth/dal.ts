//DATA ACCESS LAYER
import "server-only"
import { redirect } from "next/navigation";
import { UserSchema } from "..";
import { cache } from "react";
import getToken from "./token";

export const verifySession = cache( async () => {
    const token = getToken();
    if (!token) {
        redirect('/auth/login');
    }

    const url = `${process.env.API_URL}/auth/user`;
    const req = await fetch(url, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    const sesion = await req.json();
    const result = UserSchema.safeParse(sesion);

    if(!result.success) {
        redirect('/auth/login');
    }

    return {
        user: result.data,
        isAuth:true
    }
    
})