"use server"

import { DraftExpenseEschema, ErrorSchema, SuccessSchema } from "@/src";
import getToken from "@/src/auth/token";

type ActionStateType = {
    errors: string[];
    success: string;
}

export default async function createExpenseAction(budgetId:number, prevState: ActionStateType ,formData: FormData) {
    const expenseData = {
        name : formData.get('name'),
        amount : formData.get('amount'),
    }

    const expense = DraftExpenseEschema.safeParse(expenseData);
    if(!expense.success) {
        const errors = expense.error.errors.map(error => error.message);
        return {
            errors,
            success: ''
        }
    }

    //generar gasto
    const token = getToken();
    const url = `${process.env.API_URL}/budgets/${budgetId}/expenses`;

    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            name: expense.data.name,
            amount: expense.data.amount
        })
    })

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