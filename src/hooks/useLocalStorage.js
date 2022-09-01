import { useState, useEffect } from "react"

export default function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(key)
    if (jsonValue != null) return JSON.parse(jsonValue)
    
    if (typeof defaultValue === "function") {
      return defaultValue()
    } else {
      return defaultValue
    }
  })
  
  useEffect(() => {
    //fikrst login data then first update then download 
    //here post or put
   // fetch()
  //  fetch('http://localhost:3001/todo/login', {
  //   method: 'POST', // or 'PUT'
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     "name":"erid3gfg",
  //     "password":"12345p[po6"
  //   }),
  // })
    //https://api.nationalize.io/?name=${yo}


// fetch("/todos")
// .then((response) => response.json())
// .then((data) =>{ 
// console.log(data[59].info[0][0])
// if(key=="budgets"){
//   value.push(data[59].info[0][0])
//   console.log("slasa",value)
//   localStorage.setItem("budgets", JSON.stringify(value))
// }else{
//   localStorage.setItem("expenses", JSON.stringify(data[59].info[1]))
// }

// }
// );


//double array ffetchs then 0 budget set local 1 expenses set local + current valiu
console.log(key,value)
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}
