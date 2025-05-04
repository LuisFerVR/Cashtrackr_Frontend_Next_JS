"use client"
import { Budget } from '@/src'
import BudgetFieldsForm from './BudgetFieldsForm'
import { editBudgetAction } from '@/actions/edit-budget-action'
import { useFormState } from 'react-dom'
import ErrorMessage from '../UI/ErrorMessage'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

export default function EditBudgetForm({budget}: {budget: Budget}) {
    const router = useRouter();
    const editBudgetWithId = editBudgetAction.bind(null, budget.id);
    const [state, dispatch] = useFormState(editBudgetWithId,{
        errors: [],
        success: ''
    })

    useEffect(() => {
        if(state.success) {
            toast.success(state.success)
            router.push('/admin')
        }
    },[state])


  return (
        <form
          className="mt-10 space-y-3"
          noValidate
          action={dispatch}
        >
            {state.errors.map(error => <ErrorMessage key={error}>{error}</ErrorMessage>)}
            <BudgetFieldsForm budget={budget}/>
            <input
                type="submit"
                className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
                value='Guardar Cambios'
            />
        </form>
  )
}
