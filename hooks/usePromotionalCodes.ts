import useSWR, { SWRConfiguration } from 'swr'
import { IPromotionalCode } from '../interfaces'

export const usePromotionalCodes= ( url: string, config: SWRConfiguration = {} ) => {

  const { data, error } = useSWR<IPromotionalCode[]>(`${process.env.API_URL}${ url }`, config )

  return {
    promotionalCodes: data || [],
    isLoadingCodes: !error && !data,
    isError: error
  }

}