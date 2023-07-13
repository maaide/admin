import useSWR, { SWRConfiguration } from 'swr'
import { ISell } from '../interfaces'

export const useSells = ( url: string, config: SWRConfiguration = {} ) => {

  const { data, error } = useSWR<ISell[]>(`${process.env.API_URL}${ url }`, config )

  return {
    sells: data || [],
    isLoadingSells: !error && !data,
    isError: error
  }
}