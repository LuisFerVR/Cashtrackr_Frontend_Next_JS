"use server";

import { ErrorSchema, SuccessSchema, TokenSchema } from "@/src";

type ActionStateType = {
    errors : string[],
    success : string
}

export async function validateTokenAction(token:string, prevState: ActionStateType) {
    
    const resetPasswordToken = TokenSchema.safeParse(token);
    if (!resetPasswordToken.success) {
        return {
            errors: resetPasswordToken.error.errors.map(error => error.message),
            success: ''
        }
    }
    const url = `${process.env.API_URL}/auth/validate-token`;

    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token })
    });

    const res = await req.json();

    if(!req.ok) {
        const { error } = ErrorSchema.parse(res);

        return {
            errors: [error],
            success: ''
        }
    }

    const success = SuccessSchema.parse(res.token);

    return {
        errors: [],
        success
    }
}
