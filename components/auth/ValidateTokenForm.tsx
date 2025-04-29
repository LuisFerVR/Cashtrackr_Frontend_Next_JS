import { validateTokenAction } from "@/actions/validate-token-action";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";

type ValidateTokenFormProps = {
    setIsValidToken : React.Dispatch<React.SetStateAction<boolean>>
    token: string
    setToken: React.Dispatch<React.SetStateAction<string>>
}

export default function ValidateTokenForm( {setIsValidToken, token , setToken} : ValidateTokenFormProps) {
    const [isComplete, setIsComplete] = useState(false);

    const validateTokenInput = validateTokenAction.bind(null, token);
    const [state, dispatch] = useFormState(validateTokenInput, {
        errors:[],
        success:''
    });

    useEffect(() => {
        if(isComplete){
            dispatch();
        }

    },[isComplete]);

    useEffect(()=>{
        if(state.errors){
            state.errors.forEach((error) => {
                toast.error(error);
            })
        }

        if(state.success){
            toast.success(state.success);
            setIsValidToken(true);
        }
    },[state])


  const handleChange = (token: string) => {
    setToken(token);
    setIsComplete(false);
  }

  const handleComplete = () => {
    setIsComplete(true);
  }

  return (
    <div className="flex justify-center gap-5 my-10">
      <PinInput
        value={token}
        onChange={handleChange}
        onComplete={handleComplete}
      >
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
      </PinInput>
    </div>
  )
}