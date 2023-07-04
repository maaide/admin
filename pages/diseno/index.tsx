import { LeftMenu } from '@/components/ui'
import Head from 'next/head'
import Link from 'next/link'
import React, { useState } from 'react'
import { AiOutlineEye } from 'react-icons/ai'

const DesignPage = () => {

  const [popup, setPopup] = useState('hidden')
  const [onModal, setOnModal] = useState(false)

  return (
    <>
      <Head>
        <title>Diseño</title>
      </Head>
      <LeftMenu>
        <div className={`fixed right-0 bg-black/20 ${popup} dark:bg-black/40`} onClick={() => onModal ? '' : setPopup('hidden') } style={{ width: 'calc(100% - 256px)', height: 'calc(100% - 56px)' }}>
          <div className='p-6 flex flex-col gap-2 bg-white w-[1000px] rounded-md shadow-md h-fit m-auto dark:bg-neutral-800' onMouseEnter={() => setOnModal(true)} onMouseLeave={() => setOnModal(false)}>
            <h2>Cambiar tema</h2>
            <p>Elije el tema que más encaje con tu tienda, los cambios pueden tardar hasta 24 horas habiles, se te enviara un correo cuando el cambio quede listo.
            </p>
          </div>
        </div>
        <div className='p-6 bg-[#f6f6f7] flex flex-col gap-4 dark:bg-neutral-900' style={{ width: 'calc(100% - 252px)', overflow: 'overlay' }}>
          <div className='flex justify-between gap-4 w-full max-w-1280 m-auto'>
            <h1 className='text-xl'>Diseño</h1>
            <Link className='flex gap-2' href='https://tienda-1.vercel.app' target='_blank'><AiOutlineEye className='m-auto text-xl' /><p className='m-auto'>Ver sitio web</p></Link>
          </div>
          <div className='flex justify-between gap-4 w-full max-w-1280 m-auto'>
            <iframe className='shadow-xl m-auto bg-white' src="https://tienda-1.vercel.app" width="70%" height="500px" />
            <iframe className='shadow-xl m-auto bg-white' src="https://tienda-1.vercel.app" width="30%" height="600px" />
          </div>
          <div className='w-full max-w-1280 m-auto flex flex-col gap-2'>
            <h2 className='text-lg'>Tema</h2>
            <div className='p-4 rounded-md flex gap-2 justify-between shadow-md bg-white'>
              <div className='flex gap-3'>
                <img className='w-36 rounded-md shadow-md' src='https://res.cloudinary.com/df7nchfnh/image/upload/v1687984812/Maaide%20Ecommerce/Tienda_1_lch7lu.jpg' />
                <p className='my-auto'>Default</p>
              </div>
              <div className='flex gap-3'>
                <Link href='/diseno/personalizar' className='bg-main flex text-white text-sm rounded-md w-40 h-8 my-auto'><p className='m-auto'>Personalizar</p></Link>
                <button onClick={(e: any) => {
                  e.preventDefault()
                  setPopup('flex')
                }} className='text-sm'>Cambiar tema</button>
              </div>
            </div>
          </div>
        </div>
      </LeftMenu>
    </>
  )
}

export default DesignPage