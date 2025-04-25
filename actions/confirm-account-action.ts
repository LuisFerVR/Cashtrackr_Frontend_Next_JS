"use server";

import { ErrorSchema, SuccessSchema, TokenSchema } from "@/src";

type ActionStateType = {
    errors: string[];
    success: string;
};

export async function confirmAccountAction(token: string, prevState: ActionStateType) {
    const confirmToken = TokenSchema.safeParse(token); // Valida que el token cumpla el esquema esperado

    if (!confirmToken.success) {
        // Si la validación falla, retorna los errores
        return {
            errors: confirmToken.error.issues.map((issue) => issue.message),
            success: ''
        };
    }

    // Envía el token validado a la API de confirmación
    const url = `${process.env.API_URL}/auth/confirm-account`;
    const req = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token: confirmToken.data
        }),
    });

    const res = await req.json();

    if (!req.ok) {
        // Si la respuesta es un error, se procesa con el esquema de errores
        const { error } = ErrorSchema.parse(res);
        return {
            errors: [error],
            success: ''
        };
    }

    // Si la respuesta es exitosa, se procesa con el esquema de éxito
    const success = SuccessSchema.parse(res);
    return {
        errors: [],
        success
    };
}
