"use server"

import { Budget, ErrorSchema, PasswordValidationSchema, SuccessSchema } from "@/src";
import getToken from "@/src/auth/token";
import { revalidatePath } from "next/cache";

type ActionStateType = {
    errors: string[],
    success: string
}

export async function deleteBudgetAction (budgetId: Budget['id'], prevState: ActionStateType, formData: FormData) {
    const currentPassword = PasswordValidationSchema.safeParse(formData.get('password'));
    if(!currentPassword.success) {
        return {
            errors: currentPassword.error.errors.map(error => error.message),
            success: ''
        }
    }

    //Comprobar si el password es correcto
    const token = getToken();
    const checkPasswordUrl = `${process.env.API_URL}/auth/check-password`;
    const checkPasswordReq = await fetch(checkPasswordUrl, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            password: currentPassword.data
        })
    })

    const checkPasswordRes = await checkPasswordReq.json();

    if(!checkPasswordReq.ok){
        const {error} = ErrorSchema.parse(checkPasswordRes);
        return {
            errors: [error],
            success: ''
        }
    }

    //Eliminar el presupuesto
    const deleteBudgetUrl = `${process.env.API_URL}/budgets/${budgetId}`;
    const deleteBudgetReq = await fetch(deleteBudgetUrl, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    const deleteBudgetRes = await deleteBudgetReq.json();

    if(!deleteBudgetReq.ok){
        const {error} = ErrorSchema.parse(deleteBudgetRes);
        return {
            errors: [error],
            success: ''
        }
    }

    const success = SuccessSchema.parse(deleteBudgetRes);
    revalidatePath('/admin');

    return {
        errors: [],
        success
    }
}