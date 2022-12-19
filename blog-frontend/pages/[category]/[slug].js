import { ApolloClient, InMemoryCache } from '@apollo/client' ;
import Image from 'next/image';
import React, { Fragment } from 'react';
import { GET_ALL_SLUGS, GET_INDIVIDUAL_POST } from '../../graphql/queries';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import { formatDate } from '../../utils/utils';

const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_API_URL + '/graphql',
    cache: new InMemoryCache(),
  });

export default function Posts({ post }) {

    return(
        <Fragment>
            <div className='container mx-auto min-w-full min-h-full flex flex-col items-center justify-center'>
                <div className=''>
                    <h1 className='text-center text-6xl font-bold'>{post.title}</h1><br></br>
                    <h1 className='text-center text-2xl font-semibold'>{post.category}</h1><br></br>
                    <h5 className='text-2xl font-semibold'>{"published on:  " + formatDate(post.date)}</h5>
                    <Image alt="image post" src={ process.env.NEXT_PUBLIC_API_URL + post.thumbnail } width={800} height={500} className=" h-[400px] object-fit" ></Image>
                </div>
                <div className='p-6 flex items-center justify-center'>
                    <MDXRemote {...post.content} />
                </div>
            </div>
        </Fragment>
    )
}

export async function getStaticPaths() {

    
    const { data } = await client.query({
        query: GET_ALL_SLUGS
    });

    const paths =  data.posts.data.map((post) => {
        return {
            params: { 
                slug:  post.attributes.slug,
                category : post.attributes.category.data.attributes.name
            }
        }
    });

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {

    const {data} = await client.query({
        query: GET_INDIVIDUAL_POST,
        variables: { 
            slugUrl: params.slug
        }
    })

    const attrs = data.posts.data[0].attributes;

    const html = await serialize(attrs.content);

    return {
        props: {
            post: {
                title: attrs.title,
                thumbnail: attrs.thumbnail.data.attributes.url,
                category : attrs.category.data.attributes.name,
                date: attrs.publishedAt,
                content: html
            }
        }
    }

}