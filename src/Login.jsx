import React from 'react'
import "./styleLogin.css"
const login = () => {
  return (
    <>
  {/* Coding By CodingNepal - youtube.com/codingnepal */}
  <meta charSet="utf-8" />
  <title>Animated Login Form | CodingNepal</title>
  {/* <link rel="stylesheet" href="style.css" /> */}
  <div className="center">
    <h1>Login</h1>
    <form method="post" action='l'>
      <div className="txt_field">
        <input type="text" required="" style={{color:"white"}}/>
        <span />
        <label>Username</label>
      </div>
      <div className="txt_field">
        <input type="password" required="" style={{color:"white"}} />
        <span />
        <label>Password</label>
      </div>
      {/* <div className="pass">Forgot Password?</div> */}
      <br></br>
      <input type="submit" defaultValue="Login"  />
      <div className="signup_link">
       <a style={{fontSize:"1.4em"}} href="#">Signup</a>
      </div>
    </form>
  </div>
</>

  )
}

export default login