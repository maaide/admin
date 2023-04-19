import { LeftMenu, Spinner } from '@/components/ui'
import { useClients } from '@/hooks/useClients'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'

const ClientsPage = () => {

  const {clients, isLoadingClients} = useClients('/clients')

  return (
    <>
      <Head>
        <title>Clientes</title>
      </Head>
      <LeftMenu>
        <div className='p-6 bg-[#f6f6f7] dark:bg-neutral-900' style={{ width: 'calc(100% - 252px)', overflow: 'overlay' }}>
          <div className='flex justify-between w-full max-w-1280 m-auto mb-4'>
            <h1 className='text-xl'>Clientes</h1>
            <Link className='pt-1.5 pb-1.5 h-fit pl-7 pr-7 rounded-md bg-main text-white' href='/clientes/nuevo-cliente'>Agregar cliente</Link>
          </div>
          <div className='w-full max-w-1280 m-auto'>
            {
              isLoadingClients
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
                      <th className='text-left p-2 font-normal'>Email</th>
                    </thead>
                    <tbody className='bg-white w-full dark:bg-neutral-800 dark:border-neutral-600'>
                      {
                        clients.map(client => (
                          <tr className='border-b cursor-pointer w-full dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-700' key={client._id}>
                            <td className='p-2'>
                              <p>{client.email}</p>
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

export default ClientsPage