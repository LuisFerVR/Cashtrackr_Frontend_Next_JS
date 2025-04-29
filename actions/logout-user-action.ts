"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logoutUserAction() {
    // Eliminar la cookie de sesión
    const cookie = cookies();
    cookie.delete('CASHTRACKR_TOKEN');
    
    // Redirigir al usuario a la página de inicio de sesión
    redirect('/auth/login');
}