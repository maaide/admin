import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

const LoginPage = () => {

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const handleSubmit = async () => {
    setLoading(true)
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login-admin`, loginData)
    // router.push('/')
    setLoading(false)
  }

  return (
    <div className='w-full border-t-4 border-main h-full flex bg-white fixed z-50 top-0'>
      <div className='w-[450px] p-8 flex flex-col gap-4 bg-white shadow-md rounded-md m-auto h-fit'>
        <h1 className='text-3xl'>LOGIN</h1>
        <div className='flex flex-col gap-2'>
          <p>Email</p>
          <input type='text' placeholder='Email' className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
        </div>
        <div className='flex flex-col gap-2'>
          <p>Contraseña</p>
          <input type='password' placeholder='*******' className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
        </div>
        <button onClick={handleSubmit} className='bg-main w-36 h-10 text-white'>Iniciar Sesión</button>
      </div>
    </div>
  )
}

export default LoginPage