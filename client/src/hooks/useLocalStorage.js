import { useState, useEffect } from "react"
let d= 0;
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
  // useEffect(()=>{
  //     if(key=="budgets"){
  //  //    console.log(value,"🍄", JSON.parse(localStorage.getItem("budgets")))
  //      // if(localStorage.getItem("budgets")==null){localStorage.setItem("budgets",[])}
  //       setValue(JSON.parse(localStorage.getItem("budgets")))
  //     }else{
  //      // if(localStorage.getItem("expenses")==null){localStorage.setItem("expenses",[])}
  //       setValue(JSON.parse(localStorage.getItem("expenses")))
  //       //setValue([localStorage.getItem("expenses")])
  //     //me an advanment i gues  
  //     }
  // },[])
  useEffect(() => {
    //fikrst login data then first update then download 
    //here post or put
   // fetch()
   
   d++
  
 //  let budget= localStorage.getItem("budgets")
  
   //let expenses= localStorage.getItem("expenses")

   //value becomes local storage so first fethcs then post 

   //console.log(key,value)
   //console.log(d)

    //maybe if 1 then set value
    // if(d<3){
    //   if(key=="budgets"){
    //    console.log(value,"🍄", JSON.parse(localStorage.getItem("budgets")))
    //    // if(localStorage.getItem("budgets")==null){localStorage.setItem("budgets",[])}
    //     setValue(JSON.parse(localStorage.getItem("budgets")))
    //   }else{
    //    // if(localStorage.getItem("expenses")==null){localStorage.setItem("expenses",[])}

    //     setValue(JSON.parse(localStorage.getItem("expenses")))
    //     //setValue([localStorage.getItem("expenses")])
    //   //me an advanment i gues  
    //   }
    // }
    //useeffetct fuchjhjksdhkjhlkjhflkjsadhfkljasgdhfkjasdglkjfhsdkjhfgksdljhgnmd

   if(d>=3){
   if(key=="budgets"){
   // console.log("budging")
    fetch('/todo/update', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
     
      "info":[value,[]]//sacar del local host
     
      }),
    }).then(res=>res.json()).then(
      (res)=>{
       // console.log(res.info)
   })
  }else{
  //  console.log("Expending")
    fetch('/todo/update', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
  
      "info":[[],value]//sacar del local host
     
      }),
    }).then(res=>res.json()).then(
      (res)=>{
     //   console.log(res.info)
   })
  }}


if(false){//d==1){
  fetch('/todo/login', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "name":"erick2",
      "password":"123"
    }),
  }).then(res=>res.json()).then(
    (res)=>{
      //res is also name and pass
    //  value.push(res)

      //here problem maybe first fetch then this bc u k
    //  console.log(res ,"double isn")
    
   
    localStorage.setItem("expenses", JSON.stringify(res.info[1]))
    localStorage.setItem("budgets", JSON.stringify(res.info[0]))
    //setValue(JSON.stringify(res.info))
  //return [value, setValue]

})

}
   
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

//f

//console.log(key,value)
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])
//return delay xd
  return [value, setValue]
}
