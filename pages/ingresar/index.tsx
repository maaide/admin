import { Spinner2 } from '@/components/ui'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

const LoginPage = () => {

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const router = useRouter()

  const inputChange = (e: any) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await signIn('credentials', {
      email: loginData.email,
      password: loginData.password,
      redirect: false
    })
    setLoading(false)
    if (res?.error) return setError(res.error)
    if (res?.ok) return window.location.replace('/')
  }

  return (
    <div className='bg-white w-full h-full flex border-t-4 fixed top-0 z-50 border-main'>
      <form onSubmit={handleSubmit} className='m-auto flex flex-col gap-4'>
        {
          error !== ''
            ? <p className='w-full p-2 bg-red-600 text-white text-center'>{error}</p>
            : ''
        }
        <h1 className='text-3xl w-[500px]'>INGRESAR</h1>
        <div className='flex flex-col gap-2'>
          <p>Email</p>
          <input type='text' placeholder='Email' name='email' onChange={inputChange} value={loginData.email} className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
        </div>
        <div className='flex flex-col gap-2'>
          <p>Contraseña</p>
          <input type='password' placeholder='********' name='password' onChange={inputChange} value={loginData.password} className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
        </div>
        <button type='submit' className='w-full h-10 bg-main text-white font-medium tracking-widest'>{loading ? <Spinner2 /> : 'INGRESAR'}</button>
        <Link href='/ingresar/contrasena-olvidada'>Olvide mi contraseña</Link>
      </form>
    </div>
  )
}

export default LoginPage