"use server"

import { Budget, DraftExpenseEschema, ErrorSchema, Expense, SuccessSchema } from "@/src"
import getToken from "@/src/auth/token"
import { revalidatePath } from "next/cache"

type ActionStateType = {
    errors: string[],
    success: string
}

type BudgetAndExpenseId = {
    budgetId: Budget['id'],
    expenseId: Expense['id']
}

export async function editExpenseAction ({budgetId,expenseId}: BudgetAndExpenseId,prevState: ActionStateType, formData: FormData) {
    const expense = DraftExpenseEschema.safeParse({
        name: formData.get('name'),
        amount: formData.get('amount')
    });

    if(!expense.success) {
        return {
            errors: expense.error.errors.map(error => error.message),
            success: ''
        }
    }

    //Actualizar el gasto
    const token = getToken();
    const url = `${process.env.API_URL}/budgets/${budgetId}/expenses/${expenseId}`;

    const req = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            name: expense.data.name,
            amount: expense.data.amount
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
    revalidatePath(`/admin/budgets/${budgetId}`)

    return {
        errors: [],
        success
    }
}