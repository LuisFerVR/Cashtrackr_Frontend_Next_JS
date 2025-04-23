import RegisterForm from "@/components/auth/RegisterForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Cashtrackr - Registro",
    description: "Crea una cuenta para controlar tus finanzas",
    keywords: "registro, finanzas, cashtrackr, nextjs, tailwindcss",
}

export default function RegisterPage() {
    return (
    <>
        <h1 className="font-black text-6xl text-purple-950">Crea una cuenta</h1>
        <p className="text-3xl font-bold">y controla tus <span className="text-amber-500">finanzas</span></p>
        <RegisterForm />
    </>
  )
}
