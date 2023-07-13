import useSWR, { SWRConfiguration } from 'swr'
import { IPromotionalCode } from '../interfaces'

export const usePromotionalCodes= ( url: string, config: SWRConfiguration = {} ) => {

  const { data, error } = useSWR<IPromotionalCode[]>(`${process.env.NEXT_PUBLIC_API_URL}${ url }`, config )

  return {
    promotionalCodes: data || [],
    isLoadingCodes: !error && !data,
    isError: error
  }

}