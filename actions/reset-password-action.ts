"use server";

import { ErrorSchema, ResetPasswordSchema, SuccessSchema } from "@/src";

type ActionStateType = {
    errors: string[],
    success: string
}

export async function resetPasswordAction(token:string, prevState: ActionStateType, formData: FormData) {
    const resetPasswordInput = {
        password: formData.get('password'),
        password_confirmation: formData.get('password_confirmation')
    }

    const resetPassword = ResetPasswordSchema.safeParse(resetPasswordInput);

    if (!resetPassword.success) {
        const errors = resetPassword.error.errors.map((error) => error.message);
        return {
            errors: errors,
            success: ''
        }
    }

    const url = `${process.env.API_URL}/auth/reset-password/${token}`;

    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            password: resetPasswordInput.password,
        })
    });

    const res = await req.json();

    if(!req.ok) {
        const {error} = ErrorSchema.parse(res);
        return {
            errors: [error],
            success: ''
        }
    }

    const success = SuccessSchema.parse(res);

    return {
        errors: [],
        success
    }
}