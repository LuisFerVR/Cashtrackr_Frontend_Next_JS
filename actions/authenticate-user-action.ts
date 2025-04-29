"use server";

import { ErrorSchema, LoginSchema } from "@/src";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

type ActionStateType = {
    errors: string[];
}

export async function authenticateUserAction(prevState: ActionStateType, formData: FormData) {
    console.log("authenticateUserAction", prevState, formData);
    const loginCredentials = {
        email: formData.get("email"),
        password: formData.get("password"),
    };

    const auth = LoginSchema.safeParse(loginCredentials);

    if(!auth.success) {
        return {
            errors: auth.error.issues.map((issue) => issue.message),
        };
    }

    const url = `${process.env.API_URL}/auth/login`;
    const req = await fetch(url,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: auth.data.email,
            password: auth.data.password,
        }),
    });

    const res = await req.json();

    if(!req.ok) {
        const { error } = ErrorSchema.parse(res);
        return {
            errors: [error],
        };
    }

    //Setear cookies
    cookies().set({
        name:'CASHTRACKR_TOKEN',
        value: res,
        httpOnly: true,
        path:'/'
    });

    redirect('/admin');
}