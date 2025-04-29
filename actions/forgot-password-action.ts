"use server";

import { ErrorSchema, ForgotPasswordSchema, SuccessSchema } from "@/src";

type ActionStateType = {
  errors: string[];
  success: string;
}

export async function forgotPasswordAction(prevState: ActionStateType, formData: FormData) {
  
  const forgotPassword = ForgotPasswordSchema.safeParse({
    email: formData.get('email')
  });

  if(!forgotPassword.success){
    return {
      errors: forgotPassword.error.errors.map((error) => error.message),
      success: ''
    }
  }

  const url = `${process.env.API_URL}/auth/forgot-password`;

  const req = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: formData.get('email')
    })
  })

  const res = await req.json();
  if(!req.ok){
    const {error} = ErrorSchema.parse(res);
    return {
      errors: [error],
      success: ''
    }
  }

  const success = SuccessSchema.parse(res);

  return {
    errors:[],
    success
  }
}