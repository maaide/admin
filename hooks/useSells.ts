import useSWR, { SWRConfiguration } from 'swr'
import { ISell } from '../interfaces'

export const useSells = ( url: string, config: SWRConfiguration = {} ) => {

  const { data, error } = useSWR<ISell[]>(`https://server-production-e234.up.railway.app${ url }`, config )

  return {
    sells: data || [],
    isLoadingSells: !error && !data,
    isError: error
  }
}