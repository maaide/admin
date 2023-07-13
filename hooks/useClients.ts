import useSWR, { SWRConfiguration } from 'swr'
import { IClient } from '../interfaces'

export const useClients = ( url: string, config: SWRConfiguration = {} ) => {

  const { data, error } = useSWR<IClient[]>(`${process.env.NEXT_PUBLIC_API_URL}${ url }`, config )

  return {
    clients: data || [],
    isLoadingClients: !error && !data,
    isError: error
  }
}