"use server"

import { ErrorSchema, ProfileFormSchema, SuccessSchema } from "@/src"
import getToken from "@/src/auth/token"
import { revalidatePath } from "next/cache"

type ActionStateType = {
    errors: string[]
    success: string
}

export async function updateUserAction(prevState: ActionStateType, formData: FormData) {
    const profile = ProfileFormSchema.safeParse({
      name: formData.get('name'),
      email: formData.get('email')
    })

  if (!profile.success) {
    return {
      errors: profile.error.issues.map(issue => issue.message),
      success: ''
    }
  }

  const token = getToken();
  const url = `${process.env.API_URL}/auth/user`;
  const req = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      name: profile.data.name,
      email: profile.data.email
    })
  })

  const res = await req.json();
  if (!req.ok) {
    const { error } = ErrorSchema.parse(res);
    return {
      errors: [error],
      success: ''
    }
  }

  const success = SuccessSchema.parse(res);
  revalidatePath('/admin/profile/settings');

    return {
        errors: [],
        success
    }
}