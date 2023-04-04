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
        <p>Inicio</p>
      </LeftMenu>
    </>
  )
}
