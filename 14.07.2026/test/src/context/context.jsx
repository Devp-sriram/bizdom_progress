import { createContext, useContext, useEffect, useState } from 'react'

const EmployeeContext = createContext()
const AssertContext = createContext()

export const useEmployee = () => useContext(EmployeeContext)
export const useAssert = () => useContext(AssertContext)

export function AppProvider({ children }) {
  const [employees, setEmployees] = useState(JSON.parse(localStorage.getItem('employees')) || [])
  const [asserts, setAsserts] = useState(JSON.parse(localStorage.getItem('asserts')) || [])

  useEffect(() => localStorage.setItem('employees', JSON.stringify(employees)), [employees])
  useEffect(() => localStorage.setItem('asserts', JSON.stringify(asserts)), [asserts])

  return (
    <EmployeeContext.Provider value={{ employees, setEmployees }}>
      <AssertContext.Provider value={{ asserts, setAsserts }}>
        {children}
      </AssertContext.Provider>
    </EmployeeContext.Provider>
  )
}