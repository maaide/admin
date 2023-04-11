import useSWR, { SWRConfiguration } from 'swr'
import { IPromotionalCode } from '../interfaces'

export const usePromotionalCodes= ( url: string, config: SWRConfiguration = {} ) => {

  const { data, error } = useSWR<IPromotionalCode[]>(`https://server-production-e234.up.railway.app${ url }`, config )

  return {
    promotionalCodes: data || [],
    isLoadingCodes: !error && !data,
    isError: error
  }

}