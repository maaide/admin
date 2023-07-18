import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { City, Region, IShipping } from '../../interfaces'

interface Props {
  setClientData: any
  clientData: any
  setChilexpress?: any
}

export const ShippingCost: React.FC<Props> = ({setClientData, clientData, setChilexpress}) => {

  const [regions, setRegions] = useState<Region[]>()
  const [citys, setCitys] = useState<City[]>()
  const [shipping, setShipping] = useState<IShipping[]>()
  const [city, setCity] = useState('')

    const requestRegions = async () => {
        const request = await axios.get('https://testservices.wschilexpress.com/georeference/api/v1.0/regions', {
          headers: {
            'Cache-Control': 'no-cache',
            'Ocp-Apim-Subscription-Key': '4ebbe4e737b54bfe94307bca9e36ac4d'
          }
        })
        setRegions(request.data.regions)
      }
    
      useEffect(() => {
        requestRegions()
      }, [])
    
      const regionChange = async (e: any) => {
        const region = regions?.find(region => region.regionName === e.target.value)
        const request = await axios.get(`https://testservices.wschilexpress.com/georeference/api/v1.0/coverage-areas?RegionCode=${region?.regionId}&type=0`, {
          headers: {
            'Cache-Control': 'no-cache',
            'Ocp-Apim-Subscription-Key': '4ebbe4e737b54bfe94307bca9e36ac4d'
          }
        })
        setCitys(request.data.coverageAreas)
        setClientData({...clientData, region: e.target.value})
      }
    
      const cityChange = async (e: any) => {
        const city = citys?.find(city => city.countyName === e.target.value)
        const request = await axios.post('https://testservices.wschilexpress.com/rating/api/v1.0/rates/courier', {
          "originCountyCode": "QNOR",
          "destinationCountyCode": city?.countyCode,
          "package": {
              "weight": "1",
              "height": "10",
              "width": "10",
              "length": "2"
          },
          "productType": 3,
          "contentType": 1,
          "declaredWorth": "2333",
          "deliveryTime": 0
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'Ocp-Apim-Subscription-Key': '512b6b0ff709426d82968a33be83b4a1'
          }
        })
        if (setChilexpress) {
          setChilexpress(request.data.data.courierServiceOptions)
        }
        setCity(e.target.value)
        setClientData({...clientData, city: e.target.value})
      }

  return (
    <div className='flex gap-2'>
      <select className='font-light p-1.5 rounded border text-sm w-1/2 focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' onChange={regionChange}>
        <option>Seleccionar Región</option>
        {
        regions !== undefined
          ? regions.map(region => <option key={region.regionId}>{region.regionName}</option>)
          : ''
        }
      </select>
      <select className='font-light p-1.5 w-1/2 rounded border text-sm focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' onChange={cityChange}>
        <option>Seleccionar Ciudad</option>
        {citys?.map(city => <option key={city.countyCode}>{city.countyName}</option>)}
      </select>
    </div>
  )
}
