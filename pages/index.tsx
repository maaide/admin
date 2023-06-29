import { LeftMenu } from '@/components/ui'
import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Head>
        <title>Inicio</title>
      </Head>
      <LeftMenu>
        <div className='p-6 bg-[#f6f6f7] flex flex-col gap-4 dark:bg-neutral-900' style={{ width: 'calc(100% - 252px)', overflow: 'overlay' }}>
          <div className='flex justify-between w-full max-w-1280 mx-auto mb-4'>
            <h1 className='text-xl'>Inicio</h1>
            <Link className='pt-1.5 pb-1.5 h-fit pl-7 pr-7 rounded-md bg-main text-white' href='/ventas/nueva-venta'>Nueva venta</Link>
          </div>
          <div className='flex flex-col gap-6 w-full max-w-1280 mx-auto mb-4'>
            <h2 className='text-2xl'>¡Hola Jorge! Te damos la bienvenida al panel de control de tu tienda</h2>
            <div className='bg-white flex flex-col gap-2 p-4 w-fit rounded-md shadow-md'>
              <h3 className='text-lg'>Configura tu tienda</h3>
              <div className='flex justify-between gap-4 border-t pt-4 pb-2'>
                <p className='my-auto'>Agrega tu primer producto</p>
                <button className='pt-1.5 pb-1.5 h-fit pl-7 pr-7 rounded-md bg-main text-white'>Agregar nuevo producto</button>
              </div>
              <div className='flex justify-between gap-4 border-t pt-4 pb-2'>
                <p className='my-auto'>Agrega dominio personalizado</p>
                <button className='pt-1.5 pb-1.5 h-fit pl-7 pr-7 rounded-md bg-main text-white'>Agregar dominio personalizado</button>
              </div>
              <div className='flex justify-between gap-4 border-t pt-4 pb-2'>
                <p className='my-auto'>Configura tus metodos de pagos</p>
                <button className='pt-1.5 pb-1.5 h-fit pl-7 pr-7 rounded-md bg-main text-white'>Configurar metodos de pagos</button>
              </div>
              <div className='flex justify-between gap-4 border-t pt-4 pb-2'>
                <p className='my-auto'>Configura tus metodos de envíos</p>
                <button className='pt-1.5 pb-1.5 h-fit pl-7 pr-7 rounded-md bg-main text-white'>Configurar metodos de envíos</button>
              </div>
            </div>
          </div>
        </div>
      </LeftMenu>
    </>
  )
}
