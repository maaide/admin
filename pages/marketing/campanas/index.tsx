import { LeftMenu, Spinner } from '@/components/ui'
import { IEmail } from '@/interfaces'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const CampaignPage = () => {

  const [campaigns, setCampaigns] = useState<IEmail[]>([])
  const [loading, setLoading] = useState(false)

  const getCampaigns = async () => {
    setLoading(true)
    const response = await axios.get('https://server-production-e234.up.railway.app/campaigns')
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
      <LeftMenu>
        <div className='p-6 bg-[#f6f6f7] dark:bg-neutral-900' style={{ width: 'calc(100% - 252px)', overflow: 'overlay' }}>
          <div className='w-full flex flex-col gap-4'>
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
                      <table className='w-full'>
                        <thead>
                          <tr className='border-b border-neutral-300 dark:border-neutral-600'>
                            <th className='p-2 text-left'>Receptores</th>
                            <th className='p-2 text-left'>Asunto</th>
                            <th className='p-2 text-left'>Fecha</th>
                            <th className='p-2 text-left'>Completado</th>
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
                                <tr className='border-b border-neutral-300 dark:border-neutral-600'>
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
                    )
                    : <p>No hay campañas creadas</p>
              }
            </div>
          </div>
        </div>
      </LeftMenu>
    </>
  )
}

export default CampaignPage