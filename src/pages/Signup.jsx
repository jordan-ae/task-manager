import { useState } from "react";
import AuthLayout from "../components/AuthLayout";

function Signup(){

  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  function handleSubmit(e){
    e.preventDefault()
    console.log({name,email,password})
  }

  return(

    <AuthLayout
      title="Create account"
      subtitle="Start managing your tasks today"
    >

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          className="w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
          placeholder="Full name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />

        <input
          className="w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          className="w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Create Account
        </button>

      </form>

      <p className="text-sm text-gray-500 mt-4">
        Already have an account?
        <a href="/" className="text-indigo-600 ml-1">
          Login
        </a>
      </p>

    </AuthLayout>

  )
}

export default Signup