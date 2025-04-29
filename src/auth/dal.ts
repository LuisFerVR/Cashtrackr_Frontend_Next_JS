//DATA ACCESS LAYER
import "server-only"
import { cookies } from "next/headers"
import { redirect } from "next/navigation";
import { UserSchema } from "..";
import { cache } from "react";

export const verifySession = cache( async () => {
    const token = cookies().get('CASHTRACKR_TOKEN')?.value;
    if (!token) {
        redirect('/auth/login');
    }

    const url = `${process.env.API_URL}/auth/user`;
    const req = await fetch(url, {
        headers: {
            autorization: `Bearer ${token}`
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