import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import { Metadata } from "next";

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
    </>
  )
}
