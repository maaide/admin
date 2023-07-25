import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const InicioPage = () => {

  const router = useRouter()

  useEffect(() => {
    router.push('/')
  }, [])

  return (
    <div></div>
  )
}

export default InicioPage