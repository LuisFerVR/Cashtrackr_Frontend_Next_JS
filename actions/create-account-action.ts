"use server";

import { RegisterSchema } from "@/src";

type ActionStateType = {
    errors: string[];
}


export async function createAccountAction(prevState: ActionStateType, formData: FormData) {

    const registerData = {
        email: formData.get("email"),
        name: formData.get("name"),
        password: formData.get("password"),
        password_confirmation: formData.get("password_confirmation"),
    }


    //Validación de datos
    const register = RegisterSchema.safeParse(registerData);
    
    if (!register.success) {
        const errors = register.error.errors.map((error) => error.message)
        return {
            errors
        }
    }
    

    //Enviar datos a la API
    const url = `${process.env.API_URL}auth/create-acount`;
    const req = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name:register.data.name,
            email: register.data.email,
            password: register.data.password,
        }),
    })

    const res = await req.json();
    console.log("Response: ", res);

    return {
        errors: []
    }
}