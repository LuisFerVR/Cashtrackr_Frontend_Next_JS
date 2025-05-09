"use server"

import { ErrorSchema, SuccessSchema, UpdatePasswordSchemma } from "@/src";
import getToken from "@/src/auth/token";

type ActionStateType = {
    errors: string[]
    success: string
}

export async function updatePasswordAction(prevState:ActionStateType, formData: FormData) {
    console.log('updatePasswordAction');
    const userPassword = UpdatePasswordSchemma.safeParse({
        current_password: formData.get('current_password'),
        password: formData.get('password'),
        password_confirmation: formData.get('password_confirmation')
    })

    if(!userPassword.success) {
        return {
            errors: userPassword.error.issues.map((issue) => issue.message),
            success: ''
        }
    }

    const token = getToken();
    const url = `${process.env.API_URL}/auth/update-password`;
    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            current_password: userPassword.data.current_password,
            password: userPassword.data.password,
        })
    })

    const res = await req.json();
    if(!req.ok) {
        const {error} = ErrorSchema.parse(res);
        return {
            errors: [error],
            success:''
        }
    }


    const success= SuccessSchema.parse(res);

    return {
        errors: [],
        success
    }

}