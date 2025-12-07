"use client"

import { createContext, useContext, useReducer, ReactNode, useEffect } from "react"

interface FormData {
  name: string
  email: string
}

type FormAction =
  | { type: "SET_NAME"; payload: string }
  | { type: "SET_EMAIL"; payload: string }
  | { type: "RESET" }
  | { type: "HYDRATE"; payload: FormData }

interface FormDataContextType {
  formData: FormData
  dispatch: React.Dispatch<FormAction>
}

const FormDataContext = createContext<FormDataContextType | undefined>(
  undefined
)

const STORAGE_KEY = "juicebox_form_data"

function formDataReducer(state: FormData, action: FormAction): FormData {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.payload }
    case "SET_EMAIL":
      return { ...state, email: action.payload }
    case "RESET":
      return { name: "", email: "" }
    case "HYDRATE":
      return action.payload
    default:
      return state
  }
}

export function FormDataProvider({ children }: { children: ReactNode }) {
  const [formData, dispatch] = useReducer(formDataReducer, {
    name: "",
    email: "",
  })

  // Hydrate from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        dispatch({ type: "HYDRATE", payload: parsed })
      } catch (e) {
        console.error("Failed to parse stored form data", e)
      }
    }
  }, [])

  // Persist to localStorage whenever formData changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData))
  }, [formData])

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
