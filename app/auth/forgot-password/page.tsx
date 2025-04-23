import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Cashtrackr - Olvidé mi contraseña",
    description: "Olvidé mi contraseña",
    keywords: "Olvidé mi contraseña, finanzas, cashtrackr, nextjs, tailwindcss",
}

export default function ForgotPasswordPage() {
    return (
    <>
        <h1 className="font-black text-6xl text-purple-950">¿Olvidaste tu contraseña?</h1>
        <p className="text-3xl font-bold">Aquí puedes <span className="text-amber-500">restablecerla</span></p>
        <ForgotPasswordForm />

        <nav className="mt-10 flex-col space-y-4">
            <Link 
                href='/auth/login'
                className="text-center text-gray-500">
                ¿Ya tienes una cuenta? Inicia sesión
            </Link>

            <Link 
                href='/auth/login'
                className="text-center text-gray-500">
                ¿No tienes una cuenta? Crea una
            </Link>
        </nav>
    </>
  )
}
