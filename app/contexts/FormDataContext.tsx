"use client"

import { createContext, useContext, useReducer, ReactNode } from "react"

interface FormData {
  name: string
  email: string
}

type FormAction =
  | { type: "SET_NAME"; payload: string }
  | { type: "SET_EMAIL"; payload: string }
  | { type: "RESET" }

interface FormDataContextType {
  formData: FormData
  dispatch: React.Dispatch<FormAction>
}

const FormDataContext = createContext<FormDataContextType | undefined>(
  undefined
)

function formDataReducer(state: FormData, action: FormAction): FormData {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.payload }
    case "SET_EMAIL":
      return { ...state, email: action.payload }
    case "RESET":
      return { name: "", email: "" }
    default:
      return state
  }
}

export function FormDataProvider({ children }: { children: ReactNode }) {
  const [formData, dispatch] = useReducer(formDataReducer, {
    name: "",
    email: "",
  })

  return (
    <FormDataContext.Provider value={{ formData, dispatch }}>
      {children}
    </FormDataContext.Provider>
  )
}

export function useFormData() {
  const context = useContext(FormDataContext)
  if (context === undefined) {
    throw new Error("useFormData must be used within a FormDataProvider")
  }
  return context
}
