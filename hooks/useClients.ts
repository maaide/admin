import useSWR, { SWRConfiguration } from 'swr'
import { IClient } from '../interfaces'

export const useClients = ( url: string, config: SWRConfiguration = {} ) => {

  const { data, error } = useSWR<IClient[]>(`https://server-production-e234.up.railway.app${ url }`, config )

  return {
    clients: data || [],
    isLoadingClients: !error && !data,
    isError: error
  }
}