"use server"

import { Budget, DraftBudgetSchema, ErrorSchema, SuccessSchema } from "@/src";
import getToken from "@/src/auth/token";

type ActionStateType = {
    errors: string[]
    success: string
}

export async function editBudgetAction(budgetId:Budget['id'], prevState: ActionStateType, formData: FormData) {
    const budgetData = {
        name: formData.get('name'),
        amount: formData.get('amount')
    }

    const budget = DraftBudgetSchema.safeParse(budgetData);
    const token = getToken();
    const url = `${process.env.API_URL}/budgets/${budgetId}`;
    const req = await fetch(url, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: budget.data!.name,
            amount: budget.data!.amount
        })
    })

    const res = await req.json();
    
    if (!budget.success) {
        return {
            errors: budget.error.errors.map((error) => error.message),
            success: ''
        }
    }

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