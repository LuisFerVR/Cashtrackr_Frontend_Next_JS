import { verifySession } from "@/src/auth/dal"
import getToken from "@/src/auth/token";

export async function GET(request: Request, {params}:{params: {budgetId: string, expenseId: string}}) {
    const { budgetId, expenseId } = params;
    await verifySession();
    const token = getToken();
    const url = `${process.env.API_URL}/budgets/${budgetId}/expenses/${expenseId}`
    const req = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })

    const res = await req.json();
    if(!req.ok) {
        return Response.json(res.error, {status:403})
    }

    return Response.json(res, {status: 200})
}