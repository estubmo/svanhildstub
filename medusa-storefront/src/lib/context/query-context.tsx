"use client"

import { createContext, useContext, useState } from "react"

type QueryContextType = {
  value: string
  setValue: (value: string) => void
}

const QueryContext = createContext<QueryContextType | null>(null)

interface QueryProviderProps {
  children?: React.ReactNode
}

export const QueryProvider = ({ children }: QueryProviderProps) => {
  const [value, setValue] = useState<string>("")
  return (
    <QueryContext.Provider
      value={{
        value,
        setValue,
      }}
    >
      {children}
    </QueryContext.Provider>
  )
}

export const useQuery = () => {
  const context = useContext(QueryContext)
  if (context === null) {
    throw new Error("useQuery must be used within a QueryProvider")
  }
  return context
}
