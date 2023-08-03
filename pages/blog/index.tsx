import { LeftMenu } from '@/components/ui'
import { IPost } from '@/interfaces'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const BlogPage = () => {

  const [posts, setPosts] = useState<IPost[]>([])

  const getPosts = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts`)
    if (response.data) {
      setPosts(response.data)
    }
  }

  useEffect(() => {
    getPosts()
  }, [])

  return (
    <>
      <Head>
        <title>Blog</title>
      </Head>
      <LeftMenu>
        <div className='p-6 bg-[#f6f6f7] dark:bg-neutral-900' style={{ width: 'calc(100% - 252px)', overflow: 'overlay' }}>
          <div className='flex justify-between w-full max-w-1280 m-auto mb-4'>
            <h1 className='text-xl'>Blog</h1>
            <Link className='pt-1.5 pb-1.5 h-fit pl-7 pr-7 rounded-md bg-main text-white' href='/blog/nuevo-post'>Agregar post</Link>
          </div>
          <div className='w-full max-w-1280 m-auto'>
            {
              posts.length
                ? posts.map(post => (
                  <p key={post._id}></p>
                ))
                : 'No hay posts'
            }
          </div>
        </div>
      </LeftMenu>
    </>
  )
}

export default BlogPage