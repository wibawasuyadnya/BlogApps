import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import React, {Fragment} from 'react'
import { GET_ALL_POSTS } from '../graphql/queries'


export default function Home({posts}) {
  console.log(posts);
  return (
    <Fragment>
      <div>
        <Head>
          <title>My Blog</title>
          <meta name="description" content=" Genearate by create next app "/>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className='container mx-auto w-full min-h-full'>
            <div className='flex flex-col items-center justify-center h-[300px]'>
              <h1 className='text-5xl font-bold'>Welcome to My Personal Blog</h1>
            </div>
            <div className='w-[1040px] max-[600px]:w-full mx-auto grid grid-cols-3 max-[600px]:grid-cols-1 place-items-center '>
              {
                posts.map((val, i) => {
                  return(
                      <Link key={i} legacyBehavior  href={`${val.attributes.category.data.attributes.name}/${val.attributes.slug}`}>
                        <a className='w-[300px] flex flex-col justify-center'>
                            <Image alt='blog image' src={ process.env.NEXT_PUBLIC_API_URL + val.attributes.thumbnail.data.attributes.url} width={300} height={50} className="mb-4 h-52 object-cover"/>
                            <h3 className='text-3xl font-bold' >{val.attributes.title}</h3>
                            <p  className='text-lg font-medium'>{val.attributes.description}</p>
                        </a>
                      </Link>
                  )
                })
              }
            </div>
        </div>
      </div>
    </Fragment>
  )
}  

export async function getStaticProps() {

  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_API_URL + '/graphql',
    cache: new InMemoryCache(), 
  });

  const { data } = await client.query({
    query: GET_ALL_POSTS
  })

  

  return {
    props: {
      posts: data.posts.data  
    }
  }
}