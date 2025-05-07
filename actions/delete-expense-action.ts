"use server"

import { Budget, ErrorSchema, Expense, SuccessSchema } from "@/src"
import getToken from "@/src/auth/token"
import { revalidatePath } from "next/cache"

type ActionStateType = {
    errors: string[],
    success: string
}

type BudgetAndExpenseIdType = {
    budgetId:Budget['id'],
    expenseId:Expense['id']
}

export default async function deleteExpenseAction({budgetId, expenseId} :BudgetAndExpenseIdType, prevState: ActionStateType) {
    
    const token = getToken();
    const url = `${process.env.API_URL}/budgets/${budgetId}/expenses/${expenseId}`;
    const req = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
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
    revalidatePath(`/admin/budgets/${budgetId}`);

    return {
        errors: [],
        success
    }
}