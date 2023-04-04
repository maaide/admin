import { LeftMenu, Spinner } from '@/components/ui'
import { NumberFormat } from '@/utils'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { useSells } from '../../hooks'
import { useRouter } from 'next/router'

const Sells = () => {

  const {isLoadingSells, sells} = useSells('/sells')
  const router = useRouter()

  return (
    <>
      <Head>
        <title></title>
      </Head>
      <LeftMenu>
      <div className='p-6 bg-[#f6f6f7] overflow-y-scroll dark:bg-neutral-900' style={{ width: 'calc(100% - 252px)' }}>
        <div className='flex justify-between w-full max-w-1280 m-auto mb-4'>
          <h1 className='text-xl'>Ventas</h1>
          <Link className='pt-1.5 pb-1.5 h-fit pl-7 pr-7 rounded-md bg-main text-white' href='/ventas/nueva-venta'>Nueva venta</Link>
        </div>
        <div className='w-full max-w-1280 m-auto'>
          {
            isLoadingSells
              ? (
                <div className="flex w-full">
                  <div className="m-auto mt-16 mb-16">
                    <Spinner />
                  </div>
                </div>
              )
              : (
                <table className='shadow-md w-full border dark:border-neutral-600'>
                  <thead className='bg-white border-b w-full dark:bg-neutral-800 dark:border-neutral-600'>
                    <th className='text-left p-2 font-normal'>Nombre</th>
                    <th className='text-left p-2 font-normal'>Email</th>
                    <th className='text-left p-2 font-normal'>Teléfono</th>
                    <th className='text-left p-2 font-normal'>Región</th>
                    <th className='text-left p-2 font-normal'>Envío</th>
                    <th className='text-left p-2 font-normal'>Estado</th>
                    <th className='text-left p-2 font-normal'>Fecha</th>
                  </thead>
                  <tbody className='bg-white w-full dark:bg-neutral-800 dark:border-neutral-600'>
                    {
                      sells.map(sell => (
                        <tr key={sell._id} onClick={() => router.push(`/ventas/${sell._id}`)} className='border-b cursor-pointer w-full dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-700'>
                          <td className='p-2'>
                            <p className='font-light'>{sell.firstName} {sell.lastName}</p>
                          </td>
                          <td className='p-2'>
                            <p className='font-light'>{sell.email}</p>
                          </td>
                          <td className='p-2'>
                            <p className='font-light'>+{sell.phone}</p>
                          </td>
                          <td className='p-2'>
                            <p className='font-light'>{sell.region}</p>
                          </td>
                          <td className='p-2'>
                            <p className='font-light'>${NumberFormat(sell.shipping)}</p>
                          </td>
                          <td className='p-2'>
                            <p className='font-light'>{sell.state}</p>
                          </td>
                          <td className='p-2'>
                            <p className='font-light'>{new Date(sell.createdAt!).toLocaleDateString()}</p>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              )
          }
        </div>
      </div>
      </LeftMenu>
    </>
  )
}

export default Sells