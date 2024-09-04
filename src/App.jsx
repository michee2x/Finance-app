import { useState } from 'react'
import './App.css'

function App() {
 const [data, setData] = useState({
  name:"", email:"", password:""
 })

 const submit = async (e) => {
  e.preventDefault()
  try{
    const res = await fetch("http://localhost:8000", {
      method:"POST",
      headers:{"Content-Type" : "application/json"},
      body:JSON.stringify({
        ...data
      })
    })

  } catch (err) {
    console.log("this is the error in app.jsx", err)
  }
 }
  return (
    <>
    <form className="form-signin" onSubmit={submit} style={{display:"flex", justifyItems:"center", flexDirection:"column", width:"100vw", height:"100vh"}}>       
      <h2 className="form-signin-heading" style={{textAlign:"center"}}>transaction  form</h2>
      <input type="text" className="form-control" value={data.name} onChange={(e) => setData({...data, name:e.target.value})} placeholder="name" />
      <input type="email" className="form-control" value={data.email} onChange={(e) => setData({...data, email:e.target.value})} placeholder="Email Address" />
      <input type="text" className="form-control" value={data.password} onChange={(e) => setData({...data, password:e.target.value})} placeholder="amount"/>      
      
      <button className="button" type="submit">transfer</button>   
    </form>
    </>
  )
}

export default App
//        <input type="text" classNameName='input' value={data.name} onChange={(e) => setData({...data, name:e.target.value})}/>
       