"use client";

import { confirmAccountAction } from "@/actions/confirm-account-action";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function ConfirmAccountForm() {
    const [isComplete, setIsComplete] = useState(false); // Controla si el usuario terminó de ingresar el token
    const [token, setToken] = useState(""); // Guarda el valor del token ingresado
    const confirmAccountWithToken = confirmAccountAction.bind(null, token); // Prepara la función de confirmación con el token
    const [state, dispatch] = useFormState(confirmAccountWithToken, {
        errors: [],
        success: ''
    }); // Maneja el estado de la respuesta (errores o éxito)
    const router = useRouter(); // Hook de enrutamiento para redirigir al usuario después de la confirmación
    useEffect(() => {
        if (isComplete) {
            dispatch(); // Si el token está completo, se envía para confirmación
        }
    }, [isComplete]);

    useEffect(() => {
        if(state.errors){
            state.errors.forEach(e => toast.error(e))
        }
        if(state.success){
            toast.success(state.success,{
                onClose: () => {
                    router.push('/auth/login'); // Redirige al usuario a la página de inicio de sesión después de confirmar la cuenta
                }
            })
        }

    }, [state])

    const handleChange = (token: string) => {
        setToken(token); // Actualiza el token a medida que el usuario escribe
        setIsComplete(false); // Resetea el estado de completado al cambiar el token
    };

    const handleComplete = () => {
        setIsComplete(true); // Marca que el usuario completó el ingreso del PIN
    };

    return (
        <>
            <div className="flex justify-center gap-5 my-10">
                <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
                    {/* Campos individuales para cada dígito del PIN */}
                    <PinInputField className="h-10 w-10 border border-gray-300 shadow rounded-lg placeholder-white text-center text-black" />
                    <PinInputField className="h-10 w-10 border border-gray-300 shadow rounded-lg placeholder-white text-center text-black" />
                    <PinInputField className="h-10 w-10 border border-gray-300 shadow rounded-lg placeholder-white text-center text-black" />
                    <PinInputField className="h-10 w-10 border border-gray-300 shadow rounded-lg placeholder-white text-center text-black" />
                    <PinInputField className="h-10 w-10 border border-gray-300 shadow rounded-lg placeholder-white text-center text-black" />
                    <PinInputField className="h-10 w-10 border border-gray-300 shadow rounded-lg placeholder-white text-center text-black" />
                </PinInput>
            </div>
        </>
    );
}
