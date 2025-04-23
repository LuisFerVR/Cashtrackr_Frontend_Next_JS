import LoginForm from "@/components/auth/LoginForm";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Cashtrackr - Iniciar sesión",
    description: "Iniciar sesión para controlar tus finanzas",
    keywords: "Iniciar sesión, finanzas, cashtrackr, nextjs, tailwindcss",
}

export default function LoginPage() {
    return (
    <>
        <h1 className="font-black text-6xl text-purple-950">Inicia sesión</h1>
        <p className="text-3xl font-bold">y controla tus <span className="text-amber-500">finanzas</span></p>
        <LoginForm />

        <nav className="mt-10 flex-col space-y-4">
            <Link 
                href='/auth/login'
                className="text-center text-gray-500">
                ¿No tienes una cuenta? Crea una
            </Link>
            <Link 
                href='/auth/forgat-password'
                className="text-center text-gray-500">
                ¿Olvidaste tu contraseña? Reestablecer
            </Link>
        </nav>
    </>
  )
}
