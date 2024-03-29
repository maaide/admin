import { LeftMenu, Spinner } from '@/components/ui'
import { IEmail } from '@/interfaces'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const CampaignPage = () => {

  const [campaigns, setCampaigns] = useState<IEmail[]>([])
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const getCampaigns = async () => {
    setLoading(true)
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/campaigns`)
    setCampaigns(response.data)
    setLoading(false)
  }

  useEffect(() => {
    getCampaigns()
  }, [])

  return (
    <>
      <Head>
        <title>Campañas</title>
      </Head>
        <div className='p-6 bg-[#f6f6f7] dark:bg-neutral-900' style={{ width: 'calc(100% - 70px)', overflow: 'overlay' }}>
          <div className='flex justify-between w-full max-w-1280 m-auto mb-4'>
            <h1 className='text-xl'>Campañas</h1>
            <Link href='/marketing/campanas/nueva-campana' className='pt-1.5 pb-1.5 h-fit pl-7 pr-7 rounded-md bg-main text-white'>Crear campaña</Link>
          </div>
          <div className='w-full max-w-1280 m-auto'>
            {
              loading
                ? (
                  <div className='w-full mt-20'>
                    <div className='w-fit m-auto'>
                      <Spinner />
                    </div>
                  </div>
                )
                : campaigns.length
                  ? (
                    <div className='bg-white p-2 rounded-md shadow-md dark:bg-neutral-800 dark:border dark:border-neutral-700'>
                      <table className='w-full'>
                        <thead>
                          <tr className='border-neutral-300 dark:border-neutral-600'>
                            <th className='p-2 text-left font-medium'>Receptores</th>
                            <th className='p-2 text-left font-medium'>Asunto</th>
                            <th className='p-2 text-left font-medium'>Fecha</th>
                            <th className='p-2 text-left font-medium'>Estado</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            campaigns.map(campaign => {
                              const campaignDate = new Date(campaign.date!)
                              const date = new Date()
                              const day = String(campaignDate.getUTCDate()).padStart(2, '0')
                              const month = String(campaignDate.getUTCMonth() + 1).padStart(2, '0')
                              const year = String(campaignDate.getUTCFullYear())
                              return (
                                <tr onClick={() => router.push(`/marketing/campanas/${campaign._id}`)} key={campaign._id} className='border-t border-neutral-300 cursor-pointer hover:bg-neutral-100 dark:border-neutral-600 dark:hover:bg-neutral-700'>
                                  <td className='p-2'>{campaign.address}</td>
                                  <td className='p-2'>{campaign.affair}</td>
                                  <td className='p-2'>{`${day}/${month}/${year}`}</td>
                                  <td className='p-2'>{campaignDate < date ? 'Completado' : 'No completado'}</td>
                                </tr>
                              )
                            })
                          }
                        </tbody>
                      </table>
                    </div>
                  )
                  : <p>No hay campañas creadas</p>
            }
          </div>
        </div>
    </>
  )
}

export default CampaignPage