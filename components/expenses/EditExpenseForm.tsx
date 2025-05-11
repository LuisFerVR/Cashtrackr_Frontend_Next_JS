import { DialogTitle } from "@headlessui/react";
import ExpenseForm from "./ExpenseForm";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { DraftExpense } from "@/src";
import { useFormState } from "react-dom";
import ErrorMessage from "../UI/ErrorMessage";
import { toast } from "react-toastify";
import { editExpenseAction } from "@/actions/edit-expense-action";

export default function EditExpenseForm({ closeModal }: { closeModal: () => void }) {
  const [stateExpense, setExpense] = useState<DraftExpense>();

  const {id:budgetId} = useParams();
  const searchParams = useSearchParams();
  const expenseId = searchParams.get('editExpenseId')!;


  const editExpenseActionWithBudgetId = editExpenseAction.bind(null, {
    budgetId: +budgetId,
    expenseId: +expenseId
  })

  const [state, dispatch] = useFormState(editExpenseActionWithBudgetId, {
    errors: [],
    success: ''
  });

  useEffect(()=> {
    const url = `${process.env.NEXT_PUBLIC_URl}/admin/api/budgets/${budgetId}/expenses/${expenseId}`
    console.log(url);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setExpense(data);
      })
      .catch(err => console.log(err))
  })

  useEffect(() => {
    if (state.success) {
      toast.success(state.success);
      closeModal();
    }
  })

  return (
    <>
      <DialogTitle
        as="h3"
        className="font-black text-4xl text-purple-950 my-5"
      >
        Editar Gasto
      </DialogTitle>
      <p className="text-xl font-bold">Edita los detalles de un {''}
        <span className="text-amber-500">gasto</span>
      </p>

      {state.errors.map(error => <ErrorMessage key={error}>{error}</ErrorMessage>)}

      <form
        className="bg-gray-100 shadow-lg rounded-lg p-10 mt-10 border"
        noValidate
        action={dispatch}
      >
        <ExpenseForm expense={stateExpense}/>

        <input
          type="submit"
          className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
          value='Guardar Cambios'
        />
      </form>
    </>
  )
}