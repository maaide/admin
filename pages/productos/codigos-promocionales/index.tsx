import { LeftMenu, Spinner, Spinner2 } from '@/components/ui'
import { usePromotionalCodes } from '@/hooks'
import { NumberFormat } from '@/utils'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'

const PromotionalCodes = () => {

  const {isLoadingCodes, promotionalCodes} = usePromotionalCodes('/promotional-code')

  const router = useRouter()

  const [popupView, setPopupView] = useState('hidden')
  const [popupMouse, setPopupMouse] = useState(false)
  const [codeSelect, setCodeSelect] = useState({
    _id: '',
    name: ''
  })
  const [loading, setLoading] = useState(false)

  const deleteCode = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/products/${codeSelect._id}`)
    router.reload()
    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Codigos Promocionales</title>
      </Head>
      <LeftMenu>
        <div onClick={() => !popupMouse ? setPopupView('hidden') : ''} className={`${popupView} right-0 fixed flex bg-black/20 dark:bg-black/40`} style={{ width: 'calc(100% - 256px)', height: 'calc(100vh - 56px)' }}>
          <div onMouseEnter={() => setPopupMouse(true)} onMouseLeave={() => setPopupMouse(false)} className='w-[500px] p-6 flex flex-col gap-2 rounded-md shadow-md bg-white m-auto'>
            <p>Estas seguro que deseas eliminar el codigo <strong>{codeSelect.name}</strong></p>
            <div className='flex gap-6'>
              <button onClick={deleteCode} className='bg-red-500 h-10 w-36 rounded-md text-white'>{loading ? <Spinner2 /> : 'Eliminar'}</button>
              <button onClick={() => setPopupView('hidden')}>Cancelar</button>
            </div>
          </div>
        </div>
        <div className='p-6 bg-[#f6f6f7] dark:bg-neutral-900' style={{ width: 'calc(100% - 252px)', overflow: 'overlay' }}>
          <div className='flex justify-between w-full max-w-1280 m-auto mb-4'>
            <h1 className='text-xl'>Codigos promocionales</h1>
            <Link className='pt-1.5 pb-1.5 h-fit pl-7 pr-7 rounded-md bg-main text-white' href='/productos/codigos-promocionales/nuevo-codigo'>Nuevo codigo</Link>
          </div>
          <div className='w-full max-w-1280 m-auto'>
            {
              isLoadingCodes
                ? (
                    <div className="flex w-full">
                      <div className="m-auto mt-16 mb-16">
                        <Spinner />
                      </div>
                    </div>
                  )
                : promotionalCodes.length
                  ? (
                    <table className='shadow-md w-full border dark:border-neutral-600'>
                      <thead className='bg-white border-b w-full dark:bg-neutral-800 dark:border-neutral-600'>
                        <tr>
                          <th className='text-left p-2 font-normal'>Codigo promocional</th>
                          <th className='text-left p-2 font-normal'>Tipo de descuento</th>
                          <th className='text-left p-2 font-normal'>Valor del descuento</th>
                          <th className='text-left p-2 font-normal'>Precio minimo</th>
                          <th className='text-left p-2 font-normal'>Estado</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody className='bg-white w-full dark:bg-neutral-800 dark:border-neutral-600'>
                        {
                          promotionalCodes.map(promotionalCode => (
                            <tr className='border-b cursor-pointer w-full dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-700' key={promotionalCode._id}>
                              <td className='p-2' onClick={() => router.push(`/productos/codigos-promocionales/${promotionalCode.promotionalCode}`)}>
                                <p className='font-light'>{promotionalCode.promotionalCode}</p>
                              </td>
                              <td className='p-2' onClick={() => router.push(`/productos/codigos-promocionales/${promotionalCode.promotionalCode}`)}>
                                <p className='font-light'>{promotionalCode.discountType}</p>
                              </td>
                              <td className='p-2' onClick={() => router.push(`/productos/codigos-promocionales/${promotionalCode.promotionalCode}`)}>
                                <p className='font-light'>{promotionalCode.value}</p>
                              </td>
                              <td className='p-2' onClick={() => router.push(`/productos/codigos-promocionales/${promotionalCode.promotionalCode}`)}>
                                <p className='font-light'>${NumberFormat(promotionalCode.minimumAmount)}</p>
                              </td>
                              <td className='p-2' onClick={() => router.push(`/productos/${promotionalCode.promotionalCode}`)}>
                                <p className='font-light'>
                                  {
                                    promotionalCode.state === true
                                      ? <p className='font-light w-fit pt-1 pb-1 pl-2 pr-2 bg-green-500 rounded-md text-white'>Activo</p>
                                      : <p className='font-light w-fit pt-1 pb-1 pl-2 pr-2 bg-red-500 rounded-md text-white'>Desactivado</p>
                                  }
                                </p>
                              </td>
                              <td className='p-2'>
                                <button onClick={(e: any) => {
                                  e.preventDefault()
                                  setPopupView('flex')
                                  setCodeSelect({ _id: promotionalCode._id!, name: promotionalCode.promotionalCode })
                                }}><AiOutlineClose /></button>
                              </td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                  )
                  : 'No hay codigos promocionales'
            }
          </div>
        </div>
      </LeftMenu>
    </>
  )
}

export default PromotionalCodes