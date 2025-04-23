import LoginForm from "@/components/auth/LoginForm";
import { Metadata } from "next";

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
    </>
  )
}
