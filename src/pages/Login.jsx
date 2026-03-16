import { useState } from "react";
import AuthLayout from "../components/AuthLayout";

function Login() {

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [showPassword,setShowPassword] = useState(false)
  const [loading,setLoading] = useState(false)

  function handleSubmit(e){
    e.preventDefault()

    if(!email || !password){
      alert("Please fill all fields")
      return
    }

    setLoading(true)

    setTimeout(()=>{
      console.log("login success")
      setLoading(false)
    },2000)
  }

  return (

    <AuthLayout
      title="Welcome back"
      subtitle="Login to continue to your account"
    >

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <div className="relative">

          <input
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type={showPassword ? "text":"password"}
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />

          <span
            className="absolute right-3 top-3 cursor-pointer text-gray-500"
            onClick={()=>setShowPassword(!showPassword)}
          >
            
          </span>

        </div>

        <button
          className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

      </form>

      <p className="text-sm text-gray-500 mt-4">
        Don't have an account?
        <a href="/signup" className="text-indigo-600 ml-1">
          Sign up
        </a>
      </p>

    </AuthLayout>
  )
}

export default Login
