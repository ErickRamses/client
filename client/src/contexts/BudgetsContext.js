import React, { useContext,  } from "react"
import { v4 as uuidV4 } from "uuid"
import useLocalStorage from "../hooks/useLocalStorage"

const BudgetsContext = React.createContext()

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized"

export function useBudgets() {
  return useContext(BudgetsContext)
}

export const BudgetsProvider = ({ children }) => {
  const [budgets, setBudgets] = useLocalStorage("budgets", [])
  const [expenses, setExpenses] = useLocalStorage("expenses", [])
//set expenses use and budget
// useEffect(()=>{
//   setTimeout(()=>{

//     console.log(budgets)
//     console.log("😐",JSON.parse(window.localStorage.getItem("budgets")))
//     if(window.localStorage.getItem("budgets")==null){window.localStorage.setItem("budgets","[]")}
    
//          setBudgets(JSON.parse(window.localStorage.getItem("budgets")))
    
//       if(window.localStorage.getItem("expenses")==null){window.localStorage.setItem("expenses","[]")}
//            setExpenses(JSON.parse(window.localStorage.getItem("expenses")))


//   },500)

// },[])

//here up a useeffect and add them

  function getBudgetExpenses(budgetId) {
    return expenses.filter(expense => expense.budgetId === budgetId)
  }
  function addExpense({ description, amount, budgetId }) {
    setExpenses(prevExpenses => {
       if (prevExpenses.find(expenses => expenses.description === description && expenses.budgetId === budgetId)) {
        return prevExpenses
      }
      return [...prevExpenses, { id: uuidV4(), description, amount, budgetId }]
    })
  }
  function addBudget({ name, max ,idOld}) {
    setBudgets(prevBudgets => {
      if (prevBudgets.find(budget => budget.name === name)) {
        return prevBudgets
      }
      if(idOld===undefined){
        return [...prevBudgets, { id: uuidV4(), name, max }]
      }else{
        return [...prevBudgets, { id: idOld, name, max }]

      }
    })
  }
  function deleteBudget({ id ,all}) {
 
   // onsole.log(id,all)
    setExpenses(prevExpenses => {
      return prevExpenses.map(expense => {
        if (expense.budgetId !== id) return expense
        return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID }
      })
    })
    if(all===undefined){
      //console.log("🐵")

      setBudgets(prevBudgets => {
        return prevBudgets.filter(budget => budget.id !== id)
      })
    }else{
      //console.log("🤓")
      setBudgets([])
    }
  }
  function deleteExpense({ id ,all}) {
    if(all===undefined){
    setExpenses(prevExpenses => {
      return prevExpenses.filter(expense => expense.id !== id)
    })
  }else{
    //console.log("🤓expens")
    setExpenses([])
  }}

  return (
    <BudgetsContext.Provider
      value={{
        budgets,
        setBudgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense,
      }}
    >
      {children}
    </BudgetsContext.Provider>
  )
}
