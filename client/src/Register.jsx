import React from 'react'
import { useState } from 'react'
import "./styleLogin.css"


const Register = () => {
    const [name, setname] = useState('')
	const [password, setPassword] = useState('')
	const [passwordr, setPasswordr] = useState('')

	async function loginUser(event) {
		event.preventDefault()
    if(password==passwordr){    
		const response = await fetch('https://mernt-budget.herokuapp.com//todo/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name,
				password,
			}),
		})
    //  localStorage.clear("budgets")
    //  localStorage.clear("expenses")
    //not clear reasing to []
		const data = await response.json()
    
    if( data.status !="error"){
      window.localStorage.setItem("expenses", "[]")
      window.localStorage.setItem("budgets", "[]")
 
    alert('successful')
      window.location.href = '/#/todo'

  
    }else{
        alert('something went wrong')

      
    }

	}else{
      alert('Passwords do not match')

    }
}
  return (
    <>
  <meta charSet="utf-8" />
  <title>Animated Login Form | CodingNepal</title>
  {/* <link rel="stylesheet" href="style.css" /> */}
  <div className="center">
    <h1>Register</h1>
    <form onSubmit={loginUser} autoComplete="off">
      <div className="txt_field">
      <input autoComplete="off" style={{color:"white"}} minLength={3} maxLength={12}
					value={name}
					onChange={(e) => {
            setname(e.target.value)}}
					type="text"
				/>
        <span />
        <label>Username</label>
      </div>
      <div className="txt_field">
      <input style={{color:"white"}} minLength={5} maxLength={20} autoComplete="new-password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					type="password"
					
				/>
        <span />
        <label>Password</label>
      </div>
      <div className="txt_field">
      <input style={{color:"white"}} minLength={5} maxLength={20}
					value={passwordr}
					onChange={(e) => setPasswordr(e.target.value)}
					type="password"
					
				/>
        <span />
        <label>Repeat Password </label>
      </div>
      
      {/* <div className="pass">Forgot Password?</div> */}
      <br></br>
      <input type="submit" defaultValue="Login"  />
      <div className="signup_link">
       <a style={{fontSize:"1.3em"}} href="/">Login</a>
      </div>
    </form>
  </div>
</>

  )
}

export default Register