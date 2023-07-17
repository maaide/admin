import { LeftMenu, Spinner } from '@/components/ui'
import { usePromotionalCodes } from '@/hooks'
import { NumberFormat } from '@/utils'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const PromotionalCodes = () => {

  const {isLoadingCodes, promotionalCodes} = usePromotionalCodes('/promotional-code')

  const router = useRouter()

  return (
    <>
      <Head>
        <title>Codigos Promocionales</title>
      </Head>
      <LeftMenu>
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