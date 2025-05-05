import { cache } from "react";
import getToken from "../auth/token";
import { notFound } from "next/navigation";
import { BudgetAPIResponseSchema } from "..";

export const getBudgetById = cache(async (id: string) => {    
    const token = getToken();
    const url = `${process.env.API_URL}/budgets/${id}`;
    const req = await fetch(url,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    const res = await req.json();
    
    if (!req.ok) {
        notFound();
    }

    const budget = BudgetAPIResponseSchema.parse(res);

    return budget;
})