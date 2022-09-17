import { Button, Stack } from "react-bootstrap"
import Container from "react-bootstrap/Container"
import AddBudgetModal from "./components/AddBudgetModal"
import AddExpenseModal from "./components/AddExpenseModal"
import ViewExpensesModal from "./components/ViewExpensesModal"
import BudgetCard from "./components/BudgetCard"
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard"
import TotalBudgetCard from "./components/TotalBudgetCard"
import { useEffect, useState } from "react"
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./contexts/BudgetsContext"
//import { useBudgets } from "../contexts/BudgetsContext"

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState()
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState()
  const { budgets,setBudgets, getBudgetExpenses } = useBudgets()

  //load after fetch
  const { addBudget } = useBudgets()
  const { addExpense } = useBudgets()
  const { deleteBudget } = useBudgets()
  const { deleteExpense } = useBudgets()

  

useEffect(()=>{
  document.title = "Mern App"
    //console.log(budgets)
   if(window.localStorage.getItem("budgets")=="[]" && window.localStorage.getItem("expenses")=="[]"){
 //   console.log("😴")
    deleteBudget({
      id:1,
      all:true
    })
   deleteExpense({id:1,all:true})
   // console.log("🤑")

    return
   }
    if(window.localStorage.getItem("budgets")==null){
      window.localStorage.setItem("budgets","[]")}   
    let budgets=JSON.parse(window.localStorage.getItem("budgets"))
    budgets.forEach((elem)=>{
      //console.log(elem)
      addBudget({
        name: elem.name,
        max: parseFloat(elem.max),
        idOld:elem.id
      })  
    })
  if(window.localStorage.getItem("expenses")==null){window.localStorage.setItem("expenses","[]")}
  let expenses=JSON.parse(window.localStorage.getItem("expenses"))
  expenses.forEach((elem)=>{
   // console.log(elem)
          addExpense({ 
            description:elem.description,
            amount:elem.amount,
            budgetId:elem.budgetId })
  }) 
 // console.log(budgets)
//make wait the budgets
//lets doit the hard way meeh
},[])
  //test
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }


  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true)
    setAddExpenseModalBudgetId(budgetId)
  }

  return (
    <div style={{backgroundColor:"rgb(27, 27, 27)",minHeight:"100vh",marginTop:"0px"}}>
      <Container className="" style={{paddingTop:"15px",}}>
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto" style={{color:"white"}}>{getCookie("name")}</h1>
          
          <Button variant="secondary" onClick={() => setShowAddBudgetModal(true)}>
            Add Budget
          </Button>
          {/* <Button variant="outline-primary" onClick={openAddExpenseModal}>
            Add Expense
          </Button> */}
        </Stack>
        <h3 className="me-auto" style={{color:"white",marginTop:"-25px",marginBottom:"10px"}}>Budgets:</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1rem",
            alignItems: "flex-start",
          }}
        >
          {budgets.map(budget => {
            const amount = getBudgetExpenses(budget.id).reduce(
              (total, expense) => total + expense.amount,
              0
            )
            return (
              <BudgetCard 
                key={budget.id}
                name={budget.name}
                amount={amount}
                max={budget.max}
                onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                onViewExpensesClick={() =>
                  setViewExpensesModalBudgetId(budget.id)
                }
              />
            )
          })}
          <UncategorizedBudgetCard
            onAddExpenseClick={openAddExpenseModal}
            onViewExpensesClick={() =>
              setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)
            }
          />
          <TotalBudgetCard />
        </div>
      </Container>
      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
      />
      <AddExpenseModal
        show={showAddExpenseModal}
        defaultBudgetId={addExpenseModalBudgetId}
        handleClose={() => setShowAddExpenseModal(false)}
      />
      <ViewExpensesModal
        budgetId={viewExpensesModalBudgetId}
        handleClose={() => setViewExpensesModalBudgetId()}
      />

    </div>
  )
}

export default App
