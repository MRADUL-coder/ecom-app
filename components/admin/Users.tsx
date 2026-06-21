'use client'
import fetcher from '@/lib/fetcher'
import { Card, Skeleton } from 'antd'
import moment from 'moment'
import Image from 'next/image'
import React from 'react'
import useSWR from 'swr'

const Users = () => {
    const{data,error,isLoading}=useSWR('/api/user',fetcher)

      if(isLoading)
    return <Skeleton active />

  if(error)
    return <h1 className='text-rose-500 font-medium'>{error.message}</h1>

  return (
    <div className='grid lg:grid-cols-4 gap-8'>
   
        {
       data.map((item:any,index:number)=>(
        <Card key={index} hoverable>
            <div className='flex flex-col items-center gap-6'>
                <Image
                src="/images/avt.avif"
                alt={`pic-${index}`}
                width={100}
                height={100}
                className='rounded-full'
                objectFit='cover'/>
                <Card.Meta
                title={<label className='capitalize'>{item.fullname}</label>}
                description={item.email}
                />
                <label className='text-gray-500 font-medium'>{moment(item.createdAt).format('MMM DD, YYYY hh:mm A')}</label>
            </div>
        </Card>
            ))
        }
    </div>
  )
}

export default Users