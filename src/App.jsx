import { useState } from 'react'
import './App.css'

function App() {
 const [success, setSuccess] = useState({})
const [reference, setReference] = useState("")
 const [data, setData] = useState({
  email:"", amount:""
 })

 const submit = async (e) => {
  e.preventDefault()
  try{
    const res = await fetch("https://api.paystack.co/transaction/initialize", {
      method:"POST",
      headers: {
        'Authorization': 'Bearer sk_test_0d2ad53918843f4491243f3f9b5b8d0ffa97d7fe',
        'Content-Type': 'application/json'
    },
      body:JSON.stringify({
    "email": `${data.email}`,
    "amount": `${data.amount}`,
    "callback_url": "https://finance-app-5lj8.onrender.com"
})
    })
if(!res.ok){
throw new Error(res)
}

if(res.ok){
   const Data = await res.json()
   const url = Data?.data?.authorization_url;
setReference(Data?.data?.reference)
window.location.href = url

}

  } catch (err) {
    console.log("this is the error in app.jsx", err)
  }
 }

const checkSuccess = async () => {
try{

const res = await fetch("https://api.paystack.co/transaction/verify/${reference}", {
      headers: {
        'Authorization': 'Bearer sk_test_0d2ad53918843f4491243f3f9b5b8d0ffa97d7fe',
        'Content-Type': 'application/json'
    }
    })
if(!res.ok){
throw new Error(res)
}

if(res.ok){
const data = await res.json()
setSuccess(data)

}
} catch (err){
console.log(err)
}

}
  return (
    <>
    <form className="form-signin" onSubmit={submit} style={{display:"flex", justifyItems:"center", flexDirection:"column", width:"100vw", height:"100vh"}}>       
      <h2 className="form-signin-heading" style={{textAlign:"center"}}>transaction  form</h2>
      <input type="email" className="form-control" value={data.email} onChange={(e) => setData({...data, email:e.target.value})} placeholder="Email Address" />
      <input type="number" className="form-control" value={data.amount} onChange={(e) => setData({...data, amount:e.target.value})} placeholder="amount"/>      
      
      <button className="button" type="submit">transfer</button>   
    </form>

{ reference && <div>
{Object.keys(success).length > 0 && <div> {JSON.stringify(success, null, 2)} </div>}
<button className="button" type="submit" onClick={checkSuccess}>transfer status</button>  
</div>}
    </>
  )
}

export default App
//        <input type="text" classNameName='input' value={data.name} onChange={(e) => setData({...data, name:e.target.value})}/>
       